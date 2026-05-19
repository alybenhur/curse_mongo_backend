import {
  Injectable,
  BadRequestException,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoClient, Db } from 'mongodb';
import { QueryHistory, QueryHistoryDocument } from './playground.schema';
import { UsersService } from '../users/users.service';

// Operaciones prohibidas en el playground
const FORBIDDEN_PATTERNS = [
  /dropDatabase/i,
  /shutdownServer/i,
  /fsyncLock/i,
  /killAllSessions/i,
  /db\.adminCommand/i,
  /db\.system\./i,
  /process\./i,
  /require\s*\(/i,
  /eval\s*\(/i,
];

const SYSTEM_COLLECTIONS = ['system.users', 'system.roles', 'system.version'];

// Tiempo de inactividad antes de cerrar una conexión cacheada (30 min)
const CONNECTION_TTL_MS = 30 * 60 * 1_000;

export interface QueryResult {
  success: boolean;
  result?: any;
  error?: string;
  executionTimeMs: number;
  docsAffected: number;
  queryType: string;
}

interface CachedConnection {
  client: MongoClient;
  dbName: string;
  lastUsed: number;
}

@Injectable()
export class PlaygroundService implements OnModuleDestroy {
  /** Conexiones por userId — se crean bajo demanda con la URI de Atlas del estudiante */
  private readonly connections = new Map<string, CachedConnection>();
  private cleanupTimer: NodeJS.Timeout;

  constructor(
    @InjectModel(QueryHistory.name)
    private queryHistoryModel: Model<QueryHistoryDocument>,
    private readonly usersService: UsersService,
  ) {
    // Limpia conexiones inactivas cada 10 minutos
    this.cleanupTimer = setInterval(() => this.cleanupIdleConnections(), 10 * 60 * 1_000);
  }

  async onModuleDestroy() {
    clearInterval(this.cleanupTimer);
    for (const { client } of this.connections.values()) {
      await client.close().catch(() => null);
    }
    this.connections.clear();
  }

  // ── Gestión de conexiones por usuario ─────────────────────────────────────

  private async getOrCreateConnection(userId: string): Promise<CachedConnection> {
    const cached = this.connections.get(userId);
    if (cached) {
      cached.lastUsed = Date.now();
      return cached;
    }

    const uri = await this.usersService.getDecryptedAtlasUri(userId);
    if (!uri) {
      throw new BadRequestException(
        'No tienes una conexión de MongoDB Atlas configurada. ' +
          'Configúrala en el panel del Playground.',
      );
    }

    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 });
    await client.connect();

    const dbName = this.parseDbName(uri);
    const conn: CachedConnection = { client, dbName, lastUsed: Date.now() };
    this.connections.set(userId, conn);
    return conn;
  }

  private parseDbName(uri: string): string {
    try {
      const normalized = uri
        .replace('mongodb+srv://', 'https://')
        .replace('mongodb://', 'https://');
      const pathname = new URL(normalized).pathname.replace('/', '').split('?')[0];
      return pathname || 'mongotutorplayground';
    } catch {
      return 'mongotutorplayground';
    }
  }

  private async cleanupIdleConnections() {
    const now = Date.now();
    for (const [userId, conn] of this.connections.entries()) {
      if (now - conn.lastUsed > CONNECTION_TTL_MS) {
        await conn.client.close().catch(() => null);
        this.connections.delete(userId);
      }
    }
  }

  /** Cierra y elimina la conexión cacheada de un usuario (tras cambiar URI) */
  async invalidateUserConnection(userId: string): Promise<void> {
    const cached = this.connections.get(userId);
    if (cached) {
      await cached.client.close().catch(() => null);
      this.connections.delete(userId);
    }
  }

  // ── Info del atlas del estudiante ─────────────────────────────────────────

  async getAtlasInfo(userId: string): Promise<{ dbName: string; message: string }> {
    const conn = await this.getOrCreateConnection(userId);
    return {
      dbName: conn.dbName,
      message:
        'Esta es tu base de datos personal en MongoDB Atlas. ' +
        'Puedes crear, modificar y eliminar colecciones libremente.',
    };
  }

  // ── Validar query ─────────────────────────────────────────────────────────

  private validateQuery(query: string): void {
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(query)) {
        throw new BadRequestException(
          `Operación no permitida en el playground: ${pattern.source}`,
        );
      }
    }
    for (const col of SYSTEM_COLLECTIONS) {
      if (query.includes(col)) {
        throw new BadRequestException(
          `No puedes acceder a colecciones del sistema: ${col}`,
        );
      }
    }
  }

  // ── Detectar tipo de query ────────────────────────────────────────────────

  private detectQueryType(query: string): string {
    const q = query.trim().toLowerCase();
    if (q.includes('.insertone') || q.includes('.insertmany')) return 'INSERT';
    if (q.includes('.find') && !q.includes('andmodify')) return 'FIND';
    if (q.includes('.updateone') || q.includes('.updatemany') || q.includes('.replaceone')) return 'UPDATE';
    if (q.includes('.deleteone') || q.includes('.deletemany')) return 'DELETE';
    if (q.includes('.aggregate')) return 'AGGREGATE';
    if (q.includes('.createindex') || q.includes('.dropindex')) return 'INDEX';
    if (q.includes('.drop()')) return 'DROP_COLLECTION';
    if (q.includes('show collections')) return 'SHOW';
    if (q.includes('.countdocuments') || q.includes('.count')) return 'COUNT';
    if (q.includes('.distinct')) return 'DISTINCT';
    return 'OTHER';
  }

  // ── Ejecutar query ────────────────────────────────────────────────────────

  async executeQuery(
    userId: string,
    query: string,
    stageOrder?: number,
  ): Promise<QueryResult> {
    this.validateQuery(query);

    const conn = await this.getOrCreateConnection(userId);
    const db = conn.client.db(conn.dbName);
    const queryType = this.detectQueryType(query);
    const startTime = Date.now();

    let result: any = null;
    let success = true;
    let errorMessage: string | null = null;
    let docsAffected = 0;

    try {
      result = await this.runQuery(db, query, conn.dbName, conn.client);

      if (result && typeof result === 'object') {
        if ('insertedCount' in result) docsAffected = result.insertedCount;
        else if ('modifiedCount' in result) docsAffected = result.modifiedCount;
        else if ('deletedCount' in result) docsAffected = result.deletedCount;
        else if (Array.isArray(result)) docsAffected = result.length;
        else if ('insertedId' in result) docsAffected = 1;
      }
    } catch (err: any) {
      success = false;
      errorMessage = err.message || 'Error desconocido';
    }

    const executionTimeMs = Date.now() - startTime;

    await this.queryHistoryModel.create({
      userId: new Types.ObjectId(userId),
      query,
      success,
      errorMessage,
      executionTimeMs,
      docsAffected,
      stageOrder: stageOrder ?? null,
      sandboxDb: conn.dbName,
    });

    return {
      success,
      result: success ? this.serializeResult(result) : undefined,
      error: errorMessage ?? undefined,
      executionTimeMs,
      docsAffected,
      queryType,
    };
  }

  // ── Motor de ejecución ────────────────────────────────────────────────────

  private async runQuery(
    db: Db,
    query: string,
    dbName: string,
    client: MongoClient,
  ): Promise<any> {
    const cleaned = query.trim();

    if (/^show\s+collections$/i.test(cleaned)) {
      return db.listCollections().toArray().then((cols) => cols.map((c) => c.name));
    }
    if (/^use\s+(\w+)$/i.test(cleaned)) {
      const match = cleaned.match(/^use\s+(\w+)$/i);
      return {
        message: `Switched to db '${match![1]}' (en tu Atlas, siempre se usa la BD de tu URI)`,
      };
    }

    const context = this.buildExecutionContext(db, dbName);
    const fn = new Function(...Object.keys(context), `"use strict"; return (${cleaned})`);
    const raw = fn(...Object.values(context));
    return this.resolveValue(raw);
  }

  private buildExecutionContext(db: Db, dbName: string): Record<string, any> {
    const dbProxy = new Proxy(
      { _db: db, getName: () => dbName },
      {
        get(target: any, prop: string) {
          if (prop in target) return target[prop];
          if (prop === 'getSiblingDB') return () => db;
          if (prop === 'stats') return () => db.command({ dbStats: 1 });
          if (prop === 'createCollection')
            return (name: string, opts?: any) => db.createCollection(name, opts);
          if (prop === 'listCollectionNames')
            return () => db.listCollections().toArray().then((c) => c.map((x) => x.name));
          const col = db.collection(prop);
          return new Proxy(col, {
            get(colTarget: any, colProp: string) {
              if (colProp in colTarget) return colTarget[colProp].bind(colTarget);
              return undefined;
            },
          });
        },
      },
    );

    return {
      db: dbProxy,
      ObjectId: (id?: string) => {
        const { ObjectId } = require('mongodb');
        return id ? new ObjectId(id) : new ObjectId();
      },
      ISODate: (s?: string) => (s ? new Date(s) : new Date()),
      NumberInt: (n: number) => Math.trunc(n),
      NumberLong: (n: number) => BigInt(n),
      print: (...args: any[]) => args.join(' '),
    };
  }

  private async resolveValue(val: any): Promise<any> {
    if (val && typeof val.toArray === 'function') return val.toArray();
    if (val && typeof val.then === 'function') {
      const resolved = await val;
      return this.resolveValue(resolved);
    }
    return val;
  }

  private serializeResult(result: any): any {
    return JSON.parse(
      JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
    );
  }

  // ── Historial ─────────────────────────────────────────────────────────────

  async getHistory(userId: string, limit = 20): Promise<QueryHistoryDocument[]> {
    return this.queryHistoryModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  // ── Colecciones en la BD del usuario ─────────────────────────────────────

  async getSandboxCollections(userId: string): Promise<string[]> {
    const conn = await this.getOrCreateConnection(userId);
    const db = conn.client.db(conn.dbName);
    const cols = await db.listCollections().toArray();
    return cols.map((c) => c.name);
  }

  // ── Limpiar BD (borrar todas las colecciones) ─────────────────────────────

  async clearSandbox(userId: string): Promise<{ message: string }> {
    const conn = await this.getOrCreateConnection(userId);
    const db = conn.client.db(conn.dbName);
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).drop().catch(() => null);
    }
    return {
      message: `BD limpiada: ${collections.length} colección(es) eliminada(s) de '${conn.dbName}'`,
    };
  }

  // ── Snippets por etapa ────────────────────────────────────────────────────

  getSnippetsByStage(stageOrder: number): { label: string; code: string }[] {
    const snippets: Record<number, { label: string; code: string }[]> = {
      1: [
        { label: 'Ver base de datos', code: 'db.getName()' },
        { label: 'Listar colecciones', code: 'show collections' },
      ],
      2: [
        { label: 'Primer documento', code: 'db.prueba.insertOne({ mensaje: "¡Hola MongoDB!", fecha: new Date() })' },
        { label: 'Ver documentos', code: 'db.prueba.find()' },
        { label: 'Estadísticas BD', code: 'db.stats()' },
      ],
      3: [
        { label: 'insertOne', code: 'db.productos.insertOne({\n  nombre: "Producto A",\n  precio: 100,\n  stock: 10\n})' },
        { label: 'insertMany', code: 'db.productos.insertMany([\n  { nombre: "A", precio: 10 },\n  { nombre: "B", precio: 20 }\n])' },
        { label: 'find con filtro', code: 'db.productos.find({ precio: { $lt: 50 } })' },
        { label: 'updateOne', code: 'db.productos.updateOne(\n  { nombre: "A" },\n  { $set: { precio: 15 } }\n)' },
        { label: 'deleteOne', code: 'db.productos.deleteOne({ stock: 0 })' },
      ],
      4: [
        { label: '$gt/$lt', code: 'db.col.find({ campo: { $gt: 10, $lt: 100 } })' },
        { label: '$in', code: 'db.col.find({ estado: { $in: ["activo", "pendiente"] } })' },
        { label: '$or', code: 'db.col.find({ $or: [\n  { precio: { $lt: 50 } },\n  { stock: { $gt: 100 } }\n]})' },
        { label: 'Proyección', code: 'db.col.find({}, { nombre: 1, precio: 1, _id: 0 })' },
        { label: 'Sort + Limit', code: 'db.col.find().sort({ precio: -1 }).limit(5)' },
      ],
      5: [
        { label: 'Crear índice', code: 'db.col.createIndex({ campo: 1 })' },
        { label: 'Índice compuesto', code: 'db.col.createIndex({ campo1: 1, campo2: -1 })' },
        { label: 'Índice único', code: 'db.col.createIndex({ email: 1 }, { unique: true })' },
        { label: 'Ver índices', code: 'db.col.getIndexes()' },
        { label: 'explain()', code: 'db.col.find({ campo: "valor" }).explain("executionStats")' },
      ],
      6: [
        { label: '$match + $group', code: 'db.ventas.aggregate([\n  { $match: { activo: true } },\n  { $group: { _id: "$categoria", total: { $sum: "$monto" } } }\n])' },
        { label: '$project', code: 'db.col.aggregate([\n  { $project: { nombre: 1, precioConIva: { $multiply: ["$precio", 1.19] } } }\n])' },
        { label: '$lookup (JOIN)', code: 'db.pedidos.aggregate([\n  { $lookup: {\n    from: "clientes",\n    localField: "clienteId",\n    foreignField: "_id",\n    as: "cliente"\n  }}\n])' },
        { label: 'Top 5', code: 'db.ventas.aggregate([\n  { $group: { _id: "$producto", total: { $sum: "$monto" } } },\n  { $sort: { total: -1 } },\n  { $limit: 5 }\n])' },
      ],
    };
    return snippets[stageOrder] ?? [
      { label: 'Listar colecciones', code: 'show collections' },
      { label: 'Ver documentos', code: 'db.miColeccion.find()' },
    ];
  }
}
