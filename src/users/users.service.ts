import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MongoClient } from 'mongodb';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

// ── Helpers de encriptación AES-256-GCM ──────────────────────────────────────
const ALGO = 'aes-256-gcm';

function getEncryptionKey(): Buffer {
  const hex = process.env.ATLAS_URI_ENCRYPTION_KEY ?? '';
  if (hex.length !== 64) {
    throw new Error(
      'ATLAS_URI_ENCRYPTION_KEY debe ser de 64 caracteres hexadecimales (32 bytes)',
    );
  }
  return Buffer.from(hex, 'hex');
}

function encryptUri(plain: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString('hex'), tag.toString('hex'), encrypted.toString('hex')].join(':');
}

function decryptUri(stored: string): string {
  const key = getEncryptionKey();
  const [ivHex, tagHex, dataHex] = stored.split(':');
  const decipher = crypto.createDecipheriv(ALGO, key, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  return Buffer.concat([
    decipher.update(Buffer.from(dataHex, 'hex')),
    decipher.final(),
  ]).toString('utf8');
}

function parseDbName(uri: string): string {
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

// ─────────────────────────────────────────────────────────────────────────────

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findAllStudents(): Promise<UserDocument[]> {
    return this.userModel
      .find({ role: UserRole.STUDENT, isActive: true })
      .select('-password')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
  }): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ email: data.email }).exec();
    if (existing) throw new ConflictException('El correo ya está registrado');

    const hashed = await bcrypt.hash(data.password, 12);
    const user = new this.userModel({ ...data, password: hashed });
    return user.save();
  }

  async updateProfile(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async updateStreak(id: string): Promise<void> {
    const user = await this.findById(id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastActiveDate) {
      const last = new Date(user.lastActiveDate);
      last.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - last.getTime()) / 86400000);

      if (diffDays === 1) {
        // Día consecutivo
        await this.userModel.findByIdAndUpdate(id, {
          $inc: { streak: 1 },
          lastActiveDate: new Date(),
        });
      } else if (diffDays > 1) {
        // Racha rota
        await this.userModel.findByIdAndUpdate(id, {
          streak: 1,
          lastActiveDate: new Date(),
        });
      }
      // diffDays === 0 → mismo día, no cambiar
    } else {
      await this.userModel.findByIdAndUpdate(id, {
        streak: 1,
        lastActiveDate: new Date(),
      });
    }
  }

  async addXp(id: string, points: number): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $inc: { xp: points } }, { new: true })
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async completeDiagnostic(
    id: string,
    scores: {
      crud: number;
      aggregation: number;
      indexes: number;
      modeling: number;
      security: number;
    },
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { diagnosticScores: scores, diagnosticCompleted: true } },
        { new: true },
      )
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // ── Atlas URI ─────────────────────────────────────────────────────────────

  /** Valida la conexión, encripta y guarda la URI de Atlas del usuario */
  async saveAtlasUri(
    userId: string,
    plainUri: string,
  ): Promise<{ dbName: string }> {
    // Validar formato básico
    if (!plainUri.startsWith('mongodb')) {
      throw new BadRequestException('La URI debe comenzar con mongodb:// o mongodb+srv://');
    }

    // Probar conexión (timeout 10s)
    const testClient = new MongoClient(plainUri, { serverSelectionTimeoutMS: 10_000 });
    try {
      await testClient.connect();
      await testClient.db().command({ ping: 1 });
    } catch (err: any) {
      throw new BadRequestException(
        `No se pudo conectar a MongoDB Atlas: ${err.message}`,
      );
    } finally {
      await testClient.close().catch(() => null);
    }

    const dbName = parseDbName(plainUri);
    const encrypted = encryptUri(plainUri);

    await this.userModel.findByIdAndUpdate(userId, { $set: { atlasUri: encrypted } }).exec();
    return { dbName };
  }

  /** Devuelve la URI desencriptada (uso interno del PlaygroundService) */
  async getDecryptedAtlasUri(userId: string): Promise<string | null> {
    const user = await this.userModel.findById(userId).select('+atlasUri').exec();
    if (!user?.atlasUri) return null;
    try {
      return decryptUri(user.atlasUri);
    } catch {
      return null;
    }
  }

  /** Estado de la conexión Atlas del usuario */
  async getAtlasStatus(userId: string): Promise<{
    configured: boolean;
    connected: boolean;
    dbName: string | null;
  }> {
    const uri = await this.getDecryptedAtlasUri(userId);
    if (!uri) return { configured: false, connected: false, dbName: null };

    const testClient = new MongoClient(uri, { serverSelectionTimeoutMS: 6_000 });
    try {
      await testClient.connect();
      await testClient.db().command({ ping: 1 });
      return { configured: true, connected: true, dbName: parseDbName(uri) };
    } catch {
      return { configured: true, connected: false, dbName: parseDbName(uri) };
    } finally {
      await testClient.close().catch(() => null);
    }
  }

  /** Elimina la URI de Atlas del usuario */
  async removeAtlasUri(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { $set: { atlasUri: null } }).exec();
  }
}
