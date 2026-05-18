import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { EvaluationService } from './evaluation.service';
import { SubmitEvaluationDto } from './dto/submit-evaluation.dto';
import { CurriculumService } from '../curriculum/curriculum.service';

@UseGuards(JwtAuthGuard)
@Controller('evaluation')
export class EvaluationController {
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly curriculumService: CurriculumService,
  ) {}

  // GET /api/evaluation/:stageOrder — Preguntas de la etapa (sin respuestas)
  @Get(':stageOrder')
  getQuestions(@Param('stageOrder', ParseIntPipe) stageOrder: number) {
    return this.evaluationService.getQuestions(stageOrder);
  }

  // POST /api/evaluation/submit — Enviar respuestas y obtener resultado
  @Post('submit')
  submit(
    @CurrentUser('_id') userId: string,
    @Body() dto: SubmitEvaluationDto,
  ) {
    return this.evaluationService.submitEvaluation(
      userId,
      dto.stageOrder,
      dto.answers,
    );
  }

  // GET /api/evaluation/:stageOrder/certificate — Descargar PDF del certificado
  @Get(':stageOrder/certificate')
  async downloadCertificate(
    @CurrentUser('_id') userId: string,
    @CurrentUser('name') userName: string,
    @Param('stageOrder', ParseIntPipe) stageOrder: number,
    @Res() res: Response,
  ) {
    const stage = await this.curriculumService.findStageByOrder(stageOrder);
    const pdfBuffer = await this.evaluationService.generateCertificatePdf(
      userId,
      stageOrder,
      userName ?? 'Estudiante',
      stage.title,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificado-etapa-${stageOrder}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
