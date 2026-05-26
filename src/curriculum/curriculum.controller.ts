import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

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

  /** Siembra lecciones faltantes — solo admins y profesores */
  @Post('admin/seed-lessons')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  async seedMissingLessons() {
    await this.curriculumService.seedMissingLessons();
    return { message: 'Lecciones faltantes sembradas correctamente' };
  }
}
