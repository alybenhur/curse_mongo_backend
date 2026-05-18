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

  // Sembrar datos al iniciar si la BD está vacía
  async onModuleInit() {
    const count = await this.stageModel.countDocuments();
    if (count === 0) {
      await this.seedCurriculum();
    }
  }

  private async seedCurriculum() {
    console.log('🌱 Sembrando currículo inicial...');
    const stages = await this.stageModel.insertMany(STAGES_SEED);

    // Mapear order → _id para asignarlo a las lecciones
    const stageMap = new Map(stages.map((s) => [s.order, s._id]));

    const lessonsWithIds = LESSONS_SEED.map((lesson) => ({
      ...lesson,
      stageId: stageMap.get(lesson.stageOrder),
    }));

    await this.lessonModel.insertMany(lessonsWithIds);
    console.log(`✅ ${stages.length} etapas y ${lessonsWithIds.length} lecciones sembradas`);
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
