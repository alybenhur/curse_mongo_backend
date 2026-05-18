import { Injectable, BadRequestException, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { MongoClient, Db } from 'mongodb';
import { QueryHistory, QueryHistoryDocument } from './playground.schema';

// Operaciones prohibidas en el sandbox
const FORBIDDEN_PATTERNS = [
  /dropDatabase/i,
  /\.drop\s*\(\s*\)/i,
  /shutdownServer/i,
  /fsyncLock/i,
  /killAllSessions/i,
  /db\.adminCommand/i,
  /db\.system\./i,
  /fs\.files/i,
  /process\./i,
  /require\s*\(/i,
  /eval\s*\(/i,
];

// Colecciones de sistema que no se pueden modificar
const SYSTEM_COLLECTIONS = ['system.users', 'system.roles', 'system.version'];

export interface QueryResult {
  success: boolean;
  result?: any;
  error?: string;
  executionTimeMs: number;
  docsAffected: number;
  queryType: string;
}

@Injectable()
export class PlaygroundService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;

  constructor(
    @InjectModel(QueryHistory.name)
    private queryHistoryModel: Model<QueryHistoryDocument>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const uri = this.configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017');
    this.client = new MongoClient(uri);
    await this.client.connect();
    console.log('🎮 Playground MongoDB conectado');
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  // ── Obtener/crear sandbox del estudiante ──────────────────────────────────

  getSandboxName(userId: string): string {
    return `sandbox_${userId}`;
  }

  private getSandboxDb(userId: string): Db {
    return this.client.db(this.getSandboxName(userId));
  }

  // ── Validar query ─────────────────────────────────────────────────────────

  private validateQuery(query: string): void {
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(query)) {
        throw new BadRequestException(
          `Operación no permitida en el sandbox: ${pattern.source}`,
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
    if (q.includes('show collections') || q.includes('show dbs')) return 'SHOW';
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

    const sandboxDb = this.getSandboxDb(userId);
    const sandboxName = this.getSandboxName(userId);
    const queryType = this.detectQueryType(query);
    const startTime = Date.now();

    let result: any = null;
    let success = true;
    let errorMessage: string | null = null;
    let docsAffected = 0;

    try {
      result = await this.runQuery(sandboxDb, query, sandboxName);

      // Calcular docsAffected según tipo
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

    // Guardar en historial
    await this.queryHistoryModel.create({
      userId: new Types.ObjectId(userId),
      query,
      success,
      errorMessage,
      executionTimeMs,
      docsAffected,
      stageOrder: stageOrder ?? null,
      sandboxDb: sandboxName,
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

  // ── Motor de ejecución de queries ─────────────────────────────────────────

  private async runQuery(db: Db, query: string, dbName: string): Promise<any> {
    const cleaned = query.trim();

    // Comandos especiales de shell
    if (/^show\s+collections$/i.test(cleaned)) {
      return db.listCollections().toArray().then((cols) => cols.map((c) => c.name));
    }
    if (/^show\s+dbs$/i.test(cleaned)) {
      const adminDb = this.client.db('admin');
      const result = await adminDb.command({ listDatabases: 1 });
      return result.databases.map((d: any) => ({ name: d.name, sizeOnDisk: d.sizeOnDisk }));
    }
    if (/^use\s+(\w+)$/i.test(cleaned)) {
      const match = cleaned.match(/^use\s+(\w+)$/i);
      return { message: `Switched to db '${match![1]}' (en sandbox, siempre usa tu BD aislada)` };
    }

    // Construir contexto de ejecución con helpers MongoDB
    const context = this.buildExecutionContext(db, dbName);

    // Evaluar la query en el contexto
    const fn = new Function(...Object.keys(context), `"use strict"; return (${cleaned})`);
    const raw = fn(...Object.values(context));

    // Resolver promesas y cursores
    return this.resolveValue(raw);
  }

  private buildExecutionContext(db: Db, dbName: string): Record<string, any> {
    // Proxy para db.collection acceso tipo db.nombreColeccion
    const dbProxy = new Proxy(
      { _db: db, getName: () => dbName },
      {
        get(target: any, prop: string) {
          if (prop in target) return target[prop];
          if (prop === 'getSiblingDB') return (name: string) => db;
          if (prop === 'stats') return () => db.command({ dbStats: 1 });
          if (prop === 'createCollection') return (name: string, opts?: any) => db.createCollection(name, opts);
          if (prop === 'listCollectionNames') return () => db.listCollections().toArray().then((c) => c.map((x) => x.name));
          // Retornar colección
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
      JSON.stringify(result, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v,
      ),
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

  async clearSandbox(userId: string): Promise<{ message: string }> {
    const db = this.getSandboxDb(userId);
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).drop().catch(() => null);
    }
    return { message: `Sandbox limpiado: ${collections.length} colección(es) eliminada(s)` };
  }

  async getSandboxCollections(userId: string): Promise<string[]> {
    const db = this.getSandboxDb(userId);
    const cols = await db.listCollections().toArray();
    return cols.map((c) => c.name);
  }

  // ── Snippets por etapa ─────────────────────────────────────────────────────

  getSnippetsByStage(stageOrder: number): { label: string; code: string }[] {
    const snippets: Record<number, { label: string; code: string }[]> = {
      1: [
        { label: 'Ver base de datos actual', code: 'db.getName()' },
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
        { label: 'Operadores $gt/$lt', code: 'db.col.find({ campo: { $gt: 10, $lt: 100 } })' },
        { label: '$in - múltiples valores', code: 'db.col.find({ estado: { $in: ["activo", "pendiente"] } })' },
        { label: '$and / $or', code: 'db.col.find({ $or: [\n  { precio: { $lt: 50 } },\n  { stock: { $gt: 100 } }\n]})' },
        { label: 'Proyección', code: 'db.col.find({}, { nombre: 1, precio: 1, _id: 0 })' },
        { label: 'Sort + Limit + Skip', code: 'db.col.find().sort({ precio: -1 }).limit(5).skip(0)' },
      ],
      5: [
        { label: 'Crear índice simple', code: 'db.col.createIndex({ campo: 1 })' },
        { label: 'Índice compuesto', code: 'db.col.createIndex({ campo1: 1, campo2: -1 })' },
        { label: 'Índice único', code: 'db.col.createIndex({ email: 1 }, { unique: true })' },
        { label: 'Ver índices', code: 'db.col.getIndexes()' },
        { label: 'explain()', code: 'db.col.find({ campo: "valor" }).explain("executionStats")' },
      ],
      6: [
        { label: '$match + $group', code: 'db.ventas.aggregate([\n  { $match: { activo: true } },\n  { $group: { _id: "$categoria", total: { $sum: "$monto" } } }\n])' },
        { label: '$project', code: 'db.col.aggregate([\n  { $project: { nombre: 1, precioConIva: { $multiply: ["$precio", 1.19] } } }\n])' },
        { label: '$lookup (JOIN)', code: 'db.pedidos.aggregate([\n  { $lookup: {\n    from: "clientes",\n    localField: "clienteId",\n    foreignField: "_id",\n    as: "cliente"\n  }}\n])' },
        { label: '$sort + $limit (top 5)', code: 'db.ventas.aggregate([\n  { $group: { _id: "$producto", total: { $sum: "$monto" } } },\n  { $sort: { total: -1 } },\n  { $limit: 5 }\n])' },
      ],
    };
    return snippets[stageOrder] ?? [
      { label: 'Listar colecciones', code: 'show collections' },
      { label: 'Ver documentos', code: 'db.miColeccion.find()' },
    ];
  }
}
