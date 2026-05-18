import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as crypto from 'crypto';
import { Progress, ProgressDocument, StageStatus } from './schemas/progress.schema';
import { CurriculumService } from '../curriculum/curriculum.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    private curriculumService: CurriculumService,
    private usersService: UsersService,
  ) {}

  /** Convierte userId string a ObjectId para queries consistentes */
  private toOid(userId: string): Types.ObjectId {
    return new Types.ObjectId(userId);
  }

  // ── Inicializar progreso del estudiante ───────────────────────────────────

  async initializeProgress(userId: string): Promise<void> {
    const oid = this.toOid(userId);
    const stages = await this.curriculumService.findAllStages();

    const existing = await this.progressModel
      .find({ userId: oid })
      .sort({ stageOrder: 1 })
      .exec();

    if (existing.length === 0) {
      // Primera vez: crear todos los registros, etapa 1 en progreso
      const progressDocs = stages.map((stage, idx) => ({
        userId: oid,
        stageOrder: stage.order,
        stageId: stage._id,
        status: idx === 0 ? StageStatus.IN_PROGRESS : StageStatus.LOCKED,
        startedAt: idx === 0 ? new Date() : null,
      }));
      await this.progressModel.insertMany(progressDocs);
      return;
    }

    // Ya existe progreso: garantizar que la etapa 1 esté desbloqueada
    const firstStage = existing.find((p) => p.stageOrder === 1);
    if (firstStage && firstStage.status === StageStatus.LOCKED) {
      await this.progressModel.findByIdAndUpdate(firstStage._id, {
        $set: { status: StageStatus.IN_PROGRESS, startedAt: new Date() },
      });
    }

    // Agregar etapas que no tengan registro aún (por si se añadieron después)
    const existingOrders = new Set(existing.map((p) => p.stageOrder));
    const missingStages = stages.filter((s) => !existingOrders.has(s.order));
    if (missingStages.length > 0) {
      const missingDocs = missingStages.map((stage) => ({
        userId: oid,
        stageOrder: stage.order,
        stageId: stage._id,
        status: StageStatus.LOCKED,
        startedAt: null,
      }));
      await this.progressModel.insertMany(missingDocs);
    }
  }

  // ── Reiniciar progreso (borrar y recrear) ─────────────────────────────────

  async resetProgress(userId: string): Promise<void> {
    const oid = this.toOid(userId);
    await this.progressModel.deleteMany({ userId: oid });
    await this.initializeProgress(userId);
  }

  // ── Obtener progreso del estudiante ───────────────────────────────────────

  async getUserProgress(userId: string): Promise<ProgressDocument[]> {
    return this.progressModel
      .find({ userId: this.toOid(userId) })
      .sort({ stageOrder: 1 })
      .exec();
  }

  async getStageProgress(userId: string, stageOrder: number): Promise<ProgressDocument> {
    const progress = await this.progressModel
      .findOne({ userId: this.toOid(userId), stageOrder })
      .exec();
    if (!progress) throw new NotFoundException('Progreso de etapa no encontrado');
    return progress;
  }

  // ── Completar lección ─────────────────────────────────────────────────────

  async completeLesson(
    userId: string,
    lessonId: string,
    stageOrder: number,
    timeSpentMinutes: number = 5,
  ): Promise<ProgressDocument> {
    const progress = await this.progressModel
      .findOne({ userId: this.toOid(userId), stageOrder })
      .exec();
    if (!progress) throw new NotFoundException('Progreso no encontrado');

    const lessonObjectId = new Types.ObjectId(lessonId);
    const alreadyCompleted = progress.completedLessons.some(
      (id) => id.toString() === lessonId,
    );

    if (!alreadyCompleted) {
      const totalLessons = await this.curriculumService.findLessonsByStage(stageOrder);
      const newCompleted = progress.completedLessons.length + 1;
      const percent = Math.round((newCompleted / totalLessons.length) * 100);

      await this.progressModel.findByIdAndUpdate(progress._id, {
        $addToSet: { completedLessons: lessonObjectId },
        $set: { completionPercent: percent },
        $inc: { timeSpentMinutes },
      });

      const lesson = await this.curriculumService.findLessonById(lessonId);
      await this.usersService.addXp(userId, lesson.xpReward);
    }

    return this.progressModel.findById(progress._id).exec() as Promise<ProgressDocument>;
  }

  // ── Registrar resultado de evaluación ─────────────────────────────────────

  async recordEvaluation(
    userId: string,
    stageOrder: number,
    score: number,
    passed: boolean,
  ): Promise<{ progress: ProgressDocument; certificateCode?: string }> {
    const progress = await this.progressModel
      .findOne({ userId: this.toOid(userId), stageOrder })
      .exec();
    if (!progress) throw new NotFoundException('Progreso no encontrado');

    const historyEntry = { score, date: new Date(), passed };
    let certificateCode: string | undefined;

    const update: any = {
      $set: { evaluationScore: score },
      $push: { evaluationHistory: historyEntry },
    };

    if (passed && progress.status !== StageStatus.COMPLETED) {
      update.$set.status = StageStatus.COMPLETED;
      update.$set.completedAt = new Date();
      update.$set.completionPercent = 100;
      update.$set.certificateIssued = true;

      certificateCode = `MT-${stageOrder}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      update.$set.certificateCode = certificateCode;

      await this.unlockNextStage(userId, stageOrder);

      const stage = await this.curriculumService.findStageByOrder(stageOrder);
      await this.usersService.addXp(userId, stage.xpReward);
    } else if (passed && progress.certificateCode) {
      certificateCode = progress.certificateCode;
    }

    await this.progressModel.findByIdAndUpdate(progress._id, update);
    const updated = await this.progressModel.findById(progress._id).exec() as ProgressDocument;
    return { progress: updated, certificateCode };
  }

  // ── Desbloquear siguiente etapa ───────────────────────────────────────────

  private async unlockNextStage(userId: string, completedOrder: number): Promise<void> {
    const nextStage = await this.progressModel
      .findOne({ userId: this.toOid(userId), stageOrder: completedOrder + 1 })
      .exec();

    if (nextStage && nextStage.status === StageStatus.LOCKED) {
      await this.progressModel.findByIdAndUpdate(nextStage._id, {
        $set: {
          status: StageStatus.IN_PROGRESS,
          startedAt: new Date(),
        },
      });
    }
  }

  // ── Resumen global del estudiante ─────────────────────────────────────────

  async getGlobalSummary(userId: string) {
    const allProgress = await this.getUserProgress(userId);
    const completed = allProgress.filter((p) => p.status === StageStatus.COMPLETED).length;
    const inProgress = allProgress.filter((p) => p.status === StageStatus.IN_PROGRESS).length;
    const locked = allProgress.filter((p) => p.status === StageStatus.LOCKED).length;
    const totalTime = allProgress.reduce((acc, p) => acc + p.timeSpentMinutes, 0);
    const globalPercent = allProgress.length > 0
      ? Math.round((completed / allProgress.length) * 100)
      : 0;

    return {
      totalStages: allProgress.length,
      completed,
      inProgress,
      locked,
      globalPercent,
      totalTimeMinutes: totalTime,
      stages: allProgress.map((p) => ({
        stageOrder: p.stageOrder,
        status: p.status,
        completionPercent: p.completionPercent,
        evaluationScore: p.evaluationScore,
        certificateIssued: p.certificateIssued,
        certificateCode: p.certificateCode,
        completedAt: p.completedAt,
      })),
    };
  }

  // ── Vista profesor: progreso de todos los estudiantes ────────────────────

  async getAllUsersProgress() {
    return this.progressModel
      .aggregate([
        {
          $group: {
            _id: '$userId',
            completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
            totalStages: { $sum: 1 },
            totalTime: { $sum: '$timeSpentMinutes' },
          },
        },
        {
          $addFields: {
            globalPercent: { $multiply: [{ $divide: ['$completed', '$totalStages'] }, 100] },
          },
        },
        { $sort: { globalPercent: -1 } },
      ])
      .exec();
  }

  async getUserProgressForAdmin(userId: string) {
    const progress = await this.getUserProgress(userId);
    const summary = await this.getGlobalSummary(userId);
    return { summary, stages: progress };
  }
}
