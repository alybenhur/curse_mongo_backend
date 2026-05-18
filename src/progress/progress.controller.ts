import {
  Controller, Get, Post, Body, Param,
  ParseIntPipe, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Inicializar progreso (llamar tras registro o diagnóstico)
  @Post('initialize')
  @HttpCode(HttpStatus.OK)
  initialize(@CurrentUser('_id') userId: string) {
    return this.progressService.initializeProgress(userId);
  }

  // Reiniciar progreso completamente (borra y recrea todos los registros)
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  reset(@CurrentUser('_id') userId: string) {
    return this.progressService.resetProgress(userId);
  }

  // Progreso completo del estudiante
  @Get('me')
  getMyProgress(@CurrentUser('_id') userId: string) {
    return this.progressService.getUserProgress(userId);
  }

  // Resumen global
  @Get('me/summary')
  getSummary(@CurrentUser('_id') userId: string) {
    return this.progressService.getGlobalSummary(userId);
  }

  // Progreso de una etapa específica
  @Get('me/stage/:order')
  getStageProgress(
    @CurrentUser('_id') userId: string,
    @Param('order', ParseIntPipe) order: number,
  ) {
    return this.progressService.getStageProgress(userId, order);
  }

  // Marcar lección como completada
  @Post('me/complete-lesson')
  @HttpCode(HttpStatus.OK)
  completeLesson(
    @CurrentUser('_id') userId: string,
    @Body() body: { lessonId: string; stageOrder: number; timeSpentMinutes?: number },
  ) {
    return this.progressService.completeLesson(
      userId,
      body.lessonId,
      body.stageOrder,
      body.timeSpentMinutes,
    );
  }

  // Registrar resultado de evaluación
  @Post('me/evaluation')
  @HttpCode(HttpStatus.OK)
  recordEvaluation(
    @CurrentUser('_id') userId: string,
    @Body() body: { stageOrder: number; score: number; passed: boolean },
  ) {
    return this.progressService.recordEvaluation(userId, body.stageOrder, body.score, body.passed);
  }

  // ── Admin ──────────────────────────────────────────────────────────────────

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllProgress() {
    return this.progressService.getAllUsersProgress();
  }

  @Get('admin/user/:userId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getUserProgress(@Param('userId') userId: string) {
    return this.progressService.getUserProgressForAdmin(userId);
  }
}
