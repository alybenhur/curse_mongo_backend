import {
  Controller, Post, Delete, Get, Body,
  UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { SetKeyDto } from './dto/set-key.dto';
import { ChatMessageDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // Registrar API key en memoria de sesión
  @Post('key')
  @HttpCode(HttpStatus.OK)
  setKey(
    @CurrentUser('_id') userId: string,
    @Body() dto: SetKeyDto,
  ) {
    this.aiService.setKey(userId, dto.apiKey);
    return { message: 'API key configurada correctamente. El asistente IA está disponible.' };
  }

  // Eliminar API key de memoria
  @Delete('key')
  @HttpCode(HttpStatus.OK)
  clearKey(@CurrentUser('_id') userId: string) {
    this.aiService.clearKey(userId);
    return { message: 'API key eliminada de la sesión.' };
  }

  // Verificar si tiene key activa (sin exponerla)
  @Get('key/status')
  getKeyStatus(@CurrentUser('_id') userId: string) {
    return { hasKey: this.aiService.hasKey(userId) };
  }

  // Chat con el asistente
  @Post('chat')
  @HttpCode(HttpStatus.OK)
  chat(
    @CurrentUser('_id') userId: string,
    @Body() dto: ChatMessageDto,
  ) {
    return this.aiService.chat(userId, dto.message, {
      lessonTitle: dto.lessonTitle,
      lessonContent: dto.lessonContent,
      stageOrder: dto.stageOrder,
      stageName: dto.stageName,
      history: dto.history,
    });
  }

  // Revisión de modelado NoSQL (etapa 9)
  @Post('review-modeling')
  @HttpCode(HttpStatus.OK)
  reviewModeling(
    @CurrentUser('_id') userId: string,
    @Body() body: { requirements: string; schema: string },
  ) {
    return this.aiService.reviewModeling(userId, body.requirements, body.schema);
  }
}
