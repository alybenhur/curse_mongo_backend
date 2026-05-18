import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QueryHistoryDocument = QueryHistory & Document;

@Schema({ timestamps: true })
export class QueryHistory {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  query: string;

  @Prop({ default: true })
  success: boolean;

  @Prop({ type: String, default: null })
  errorMessage: string | null;

  @Prop({ default: 0 })
  executionTimeMs: number;

  @Prop({ default: 0 })
  docsAffected: number;

  // Etapa desde la que se ejecutó (para análisis)
  @Prop({ type: Number, default: null })
  stageOrder: number | null;

  @Prop({ required: true })
  sandboxDb: string;
}

export const QueryHistorySchema = SchemaFactory.createForClass(QueryHistory);
QueryHistorySchema.index({ userId: 1, createdAt: -1 });
