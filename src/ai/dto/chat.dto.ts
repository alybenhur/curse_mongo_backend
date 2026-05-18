import { IsString, MaxLength, IsOptional, IsNumber, IsArray } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @MaxLength(4000)
  message: string;

  // Contexto de la lección actual
  @IsOptional()
  @IsString()
  lessonTitle?: string;

  @IsOptional()
  @IsString()
  lessonContent?: string;

  @IsOptional()
  @IsNumber()
  stageOrder?: number;

  @IsOptional()
  @IsString()
  stageName?: string;

  // Historial de mensajes anteriores (para contexto de conversación)
  @IsOptional()
  @IsArray()
  history?: { role: 'user' | 'assistant'; content: string }[];
}
