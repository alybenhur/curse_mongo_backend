import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  STUDENT = 'student',
  PROFESSOR = 'professor',
  ADMIN = 'admin',
}

export enum UserLevel {
  NOVICE = 'novato',
  APPRENTICE = 'aprendiz',
  PRACTITIONER = 'practicante',
  EXPERT = 'experto',
  MASTER = 'maestro',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop({ enum: UserLevel, default: UserLevel.NOVICE })
  level: UserLevel;

  @Prop({ default: 0 })
  xp: number;

  @Prop({ default: 0 })
  streak: number;

  @Prop({ default: null })
  lastActiveDate: Date;

  @Prop({ default: null })
  avatarUrl: string;

  // Resultado del diagnóstico inicial (0-100 por tópico)
  @Prop({
    type: {
      crud: { type: Number, default: 0 },
      aggregation: { type: Number, default: 0 },
      indexes: { type: Number, default: 0 },
      modeling: { type: Number, default: 0 },
      security: { type: Number, default: 0 },
    },
    default: {},
  })
  diagnosticScores: {
    crud: number;
    aggregation: number;
    indexes: number;
    modeling: number;
    security: number;
  };

  @Prop({ default: false })
  diagnosticCompleted: boolean;

  @Prop({ default: true })
  isActive: boolean;

  // URI de Atlas del estudiante (guardada encriptada con AES-256-GCM)
  @Prop({ default: null, select: false })
  atlasUri: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
