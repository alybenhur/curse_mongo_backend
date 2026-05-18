import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProgressDocument = Progress & Document;

export enum StageStatus {
  LOCKED = 'locked',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Progress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  stageOrder: number;

  @Prop({ type: Types.ObjectId, ref: 'Stage', required: true })
  stageId: Types.ObjectId;

  @Prop({ enum: StageStatus, default: StageStatus.LOCKED })
  status: StageStatus;

  // Lecciones completadas dentro de la etapa
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }], default: [] })
  completedLessons: Types.ObjectId[];

  // Porcentaje de completitud 0-100
  @Prop({ default: 0 })
  completionPercent: number;

  // Puntaje de la evaluación de la etapa (0-100), null si no evaluado aún
  @Prop({ type: Number, default: null })
  evaluationScore: number | null;

  // Número de intentos en la evaluación
  @Prop({ default: 0 })
  evaluationAttempts: number;

  // Historial de puntajes de evaluación
  @Prop({
    type: [{ score: Number, date: Date, passed: Boolean }],
    default: [],
  })
  evaluationHistory: { score: number; date: Date; passed: boolean }[];

  // Competencias demostradas en esta etapa (por tópico, 0-100)
  @Prop({ type: Map, of: Number, default: {} })
  topicScores: Map<string, number>;

  // Tiempo total invertido en esta etapa (minutos)
  @Prop({ default: 0 })
  timeSpentMinutes: number;

  // Fecha de inicio y finalización
  @Prop({ type: Date, default: null })
  startedAt: Date | null;

  @Prop({ type: Date, default: null })
  completedAt: Date | null;

  // Certificado emitido
  @Prop({ default: false })
  certificateIssued: boolean;

  @Prop({ type: String, default: null })
  certificateCode: string | null;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

// Índice compuesto: un registro de progreso por usuario+etapa
ProgressSchema.index({ userId: 1, stageOrder: 1 }, { unique: true });
