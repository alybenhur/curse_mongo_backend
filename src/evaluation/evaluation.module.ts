import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { ProgressModule } from '../progress/progress.module';
import { CurriculumModule } from '../curriculum/curriculum.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    ProgressModule,
    CurriculumModule,
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}
