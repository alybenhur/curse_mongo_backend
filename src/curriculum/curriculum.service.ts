import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stage, StageDocument } from './schemas/stage.schema';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { STAGES_SEED, LESSONS_SEED } from './curriculum.seed';

@Injectable()
export class CurriculumService implements OnModuleInit {
  constructor(
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  // Sembrar datos al iniciar si la BD está vacía o faltan lecciones
  async onModuleInit() {
    const stageCount = await this.stageModel.countDocuments();
    if (stageCount === 0) {
      await this.seedCurriculum();
      return;
    }
    // Las etapas ya existen → verificar si faltan lecciones (ej. etapas 4-13 sin contenido)
    await this.seedMissingLessons();
  }

  private async seedCurriculum() {
    console.log('🌱 Sembrando currículo inicial...');
    const stages = await this.stageModel.insertMany(STAGES_SEED);
    const stageMap = new Map(stages.map((s) => [s.order, s._id]));
    const lessonsWithIds = LESSONS_SEED.map((lesson) => ({
      ...lesson,
      stageId: stageMap.get(lesson.stageOrder),
    }));
    await this.lessonModel.insertMany(lessonsWithIds);
    console.log(`✅ ${stages.length} etapas y ${lessonsWithIds.length} lecciones sembradas`);
  }

  /** Siembra las lecciones que aún no existen (detecta etapas sin contenido) — público para el endpoint admin */
  async seedMissingLessons() {
    // Agrupar lecciones del seed por etapa
    const lessonsByStage = new Map<number, typeof LESSONS_SEED>();
    for (const lesson of LESSONS_SEED) {
      const list = lessonsByStage.get(lesson.stageOrder) ?? [];
      list.push(lesson);
      lessonsByStage.set(lesson.stageOrder, list);
    }

    // Obtener todas las etapas de la BD
    const stages = await this.stageModel.find().exec();
    const stageMap = new Map(stages.map((s) => [s.order, s._id]));

    const toInsert: any[] = [];

    for (const [stageOrder, lessons] of lessonsByStage) {
      const stageId = stageMap.get(stageOrder);
      if (!stageId) continue;

      // Contar lecciones existentes para esta etapa
      const existing = await this.lessonModel.countDocuments({ stageOrder });
      if (existing === 0) {
        // No hay lecciones → sembrar todas las de esta etapa
        for (const lesson of lessons) {
          toInsert.push({ ...lesson, stageId });
        }
      }
    }

    if (toInsert.length > 0) {
      await this.lessonModel.insertMany(toInsert);
      console.log(`✅ ${toInsert.length} lecciones faltantes sembradas`);
    }
  }

  // ── Etapas ────────────────────────────────────────────────────────────────

  async findAllStages(): Promise<StageDocument[]> {
    return this.stageModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findStageByOrder(order: number): Promise<StageDocument> {
    const stage = await this.stageModel.findOne({ order, isActive: true }).exec();
    if (!stage) throw new NotFoundException(`Etapa ${order} no encontrada`);
    return stage;
  }

  async findStageById(id: string): Promise<StageDocument> {
    const stage = await this.stageModel.findById(id).exec();
    if (!stage) throw new NotFoundException('Etapa no encontrada');
    return stage;
  }

  // ── Lecciones ─────────────────────────────────────────────────────────────

  async findLessonsByStage(stageOrder: number): Promise<LessonDocument[]> {
    return this.lessonModel
      .find({ stageOrder, isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findLessonById(id: string): Promise<LessonDocument> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) throw new NotFoundException('Lección no encontrada');
    return lesson;
  }

  async findNextLesson(
    stageOrder: number,
    currentOrder: number,
  ): Promise<LessonDocument | null> {
    return this.lessonModel
      .findOne({ stageOrder, order: currentOrder + 1, isActive: true })
      .exec();
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  async createStage(data: Partial<Stage>): Promise<StageDocument> {
    return this.stageModel.create(data);
  }

  async updateStage(id: string, data: Partial<Stage>): Promise<StageDocument> {
    const stage = await this.stageModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!stage) throw new NotFoundException('Etapa no encontrada');
    return stage;
  }

  async createLesson(data: Partial<Lesson>): Promise<LessonDocument> {
    return this.lessonModel.create(data);
  }

  async updateLesson(id: string, data: Partial<Lesson>): Promise<LessonDocument> {
    const lesson = await this.lessonModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!lesson) throw new NotFoundException('Lección no encontrada');
    return lesson;
  }

  async deleteLesson(id: string): Promise<void> {
    await this.lessonModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }
}
