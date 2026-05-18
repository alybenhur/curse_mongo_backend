import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonDocument = Lesson & Document;

export enum LessonType {
  READING = 'reading',
  EXAMPLE = 'example',
  EXERCISE = 'exercise',
  QUIZ = 'quiz',
}

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ type: Types.ObjectId, ref: 'Stage', required: true })
  stageId: Types.ObjectId;

  @Prop({ required: true })
  stageOrder: number;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ enum: LessonType, required: true })
  type: LessonType;

  // Contenido principal en Markdown
  @Prop({ required: true })
  content: string;

  // Para lecciones tipo EXAMPLE: código de ejemplo
  @Prop({ type: String, default: null })
  codeExample: string | null;

  // Para lecciones tipo EXERCISE: instrucciones y solución esperada
  @Prop({ type: String, default: null })
  exerciseInstructions: string | null;

  @Prop({ type: String, default: null })
  exerciseSolution: string | null;

  // XP por completar la lección
  @Prop({ default: 20 })
  xpReward: number;

  // Tópicos que cubre esta lección
  @Prop({ type: [String], default: [] })
  topics: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// Índice compuesto para buscar lecciones por etapa en orden
LessonSchema.index({ stageOrder: 1, order: 1 });
