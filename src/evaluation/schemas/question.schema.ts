import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ _id: false })
export class QuestionOption {
  @Prop({ required: true }) key: string;   // 'a' | 'b' | 'c' | 'd'
  @Prop({ required: true }) text: string;
}
export const QuestionOptionSchema = SchemaFactory.createForClass(QuestionOption);

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true }) stageOrder: number;
  @Prop({ required: true }) text: string;
  @Prop({ type: [QuestionOptionSchema], default: [] }) options: QuestionOption[];
  @Prop({ required: true }) correctKey: string;
  @Prop({ type: String, default: '' }) explanation: string;
  @Prop({ type: Number, default: 1 }) points: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.index({ stageOrder: 1 });
