import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('curriculum')
@UseGuards(JwtAuthGuard)
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get('stages')
  getAllStages() {
    return this.curriculumService.findAllStages();
  }

  @Get('stages/:order')
  getStage(@Param('order', ParseIntPipe) order: number) {
    return this.curriculumService.findStageByOrder(order);
  }

  @Get('stages/:order/lessons')
  getLessonsByStage(@Param('order', ParseIntPipe) order: number) {
    return this.curriculumService.findLessonsByStage(order);
  }

  @Get('lessons/:id')
  getLesson(@Param('id') id: string) {
    return this.curriculumService.findLessonById(id);
  }
}
