import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StageDocument = Stage & Document;

@Schema({ timestamps: true })
export class Stage {
  @Prop({ required: true, unique: true })
  order: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  // Tópicos que cubre esta etapa (para análisis de deficiencias)
  @Prop({ type: [String], default: [] })
  topics: string[];

  // XP que otorga completar la etapa
  @Prop({ default: 100 })
  xpReward: number;

  // Etapa que debe completarse antes
  @Prop({ type: Number, default: null })
  prerequisiteOrder: number | null;

  @Prop({ default: true })
  isActive: boolean;
}

export const StageSchema = SchemaFactory.createForClass(Stage);
