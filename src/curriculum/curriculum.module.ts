import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { Stage, StageSchema } from './schemas/stage.schema';
import { Lesson, LessonSchema } from './schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stage.name, schema: StageSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
  exports: [CurriculumService, MongooseModule],
})
export class CurriculumModule {}
