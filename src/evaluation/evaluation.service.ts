import {
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');
import { Question, QuestionDocument } from './schemas/question.schema';
import { QUESTIONS_SEED } from './evaluation.seed';
import { ProgressService } from '../progress/progress.service';

export interface SubmitAnswer {
  questionId: string;
  selectedKey: string;
}

export interface EvaluationResult {
  score: number;          // porcentaje 0-100
  totalPoints: number;
  earnedPoints: number;
  passed: boolean;        // >= 70%
  answers: {
    questionId: string;
    correct: boolean;
    correctKey: string;
    explanation: string;
  }[];
  certificateCode?: string;
}

@Injectable()
export class EvaluationService implements OnModuleInit {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    private readonly progressService: ProgressService,
  ) {}

  async onModuleInit() {
    const count = await this.questionModel.countDocuments();
    if (count === 0) {
      await this.questionModel.insertMany(QUESTIONS_SEED);
      console.log(`✅ Evaluaciones: ${QUESTIONS_SEED.length} preguntas sembradas`);
      return;
    }
    await this.seedMissingQuestions();
  }

  /** Siembra preguntas para etapas que todavía tienen 0 preguntas en la BD */
  async seedMissingQuestions(): Promise<number> {
    // Agrupar preguntas del seed por etapa
    const byStage = new Map<number, typeof QUESTIONS_SEED>();
    for (const q of QUESTIONS_SEED) {
      const list = byStage.get(q.stageOrder) ?? [];
      list.push(q);
      byStage.set(q.stageOrder, list);
    }

    const toInsert: any[] = [];
    for (const [stageOrder, questions] of byStage) {
      const existing = await this.questionModel.countDocuments({ stageOrder });
      if (existing === 0) {
        toInsert.push(...questions);
      }
    }

    if (toInsert.length > 0) {
      await this.questionModel.insertMany(toInsert);
      console.log(`✅ Evaluaciones: ${toInsert.length} preguntas faltantes sembradas`);
    }

    return toInsert.length;
  }

  // ── Obtener preguntas de una etapa (sin revelar correctKey) ───────────────

  async getQuestions(stageOrder: number) {
    const questions = await this.questionModel
      .find({ stageOrder })
      .select('-correctKey -explanation')
      .lean();

    if (questions.length === 0) {
      throw new NotFoundException(`No hay evaluación disponible para la etapa ${stageOrder}`);
    }

    return questions;
  }

  // ── Enviar respuestas y obtener resultado ─────────────────────────────────

  async submitEvaluation(
    userId: string,
    stageOrder: number,
    answers: SubmitAnswer[],
  ): Promise<EvaluationResult> {
    const questions = await this.questionModel
      .find({ stageOrder })
      .lean();

    if (questions.length === 0) {
      throw new NotFoundException(`No hay evaluación para la etapa ${stageOrder}`);
    }

    let earnedPoints = 0;
    let totalPoints = 0;

    const answerDetails = questions.map((q) => {
      totalPoints += q.points;
      const submitted = answers.find((a) => a.questionId === String(q._id));
      const correct = submitted?.selectedKey === q.correctKey;
      if (correct) earnedPoints += q.points;
      return {
        questionId: String(q._id),
        correct,
        correctKey: q.correctKey,
        explanation: q.explanation,
      };
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= 70;

    // Registrar en el progreso del usuario
    const { certificateCode } = await this.progressService.recordEvaluation(
      userId,
      stageOrder,
      score,
      passed,
    );

    return {
      score,
      totalPoints,
      earnedPoints,
      passed,
      answers: answerDetails,
      certificateCode: passed ? certificateCode : undefined,
    };
  }

  // ── Generar PDF de certificado ────────────────────────────────────────────

  async generateCertificatePdf(
    userId: string,
    stageOrder: number,
    userName: string,
    stageTitle: string,
  ): Promise<Buffer> {
    // Verificar que el usuario realmente aprobó esta etapa
    const summary = await this.progressService.getGlobalSummary(userId);
    const stageProgress = summary.stages.find((s: any) => s.stageOrder === stageOrder);

    if (!stageProgress?.certificateCode) {
      throw new NotFoundException('Certificado no disponible para esta etapa');
    }

    const code = stageProgress.certificateCode;
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 60, right: 60 },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // ── Fondo ────────────────────────────────────────────────────────────
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#001e2b');

      // Marco decorativo externo
      doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3).stroke('#00ed64');

      // Marco interno
      doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .lineWidth(1).stroke('#00684a');

      // ── Encabezado ───────────────────────────────────────────────────────
      doc.font('Helvetica-Bold')
        .fontSize(11)
        .fillColor('#00ed64')
        .text('🍃  MONGOTUTOR', 0, 55, { align: 'center' });

      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#698279')
        .text('Plataforma de Aprendizaje MongoDB', 0, 72, { align: 'center' });

      // Línea separadora
      doc.moveTo(80, 95).lineTo(doc.page.width - 80, 95)
        .lineWidth(0.5).stroke('#00684a');

      // ── Título ───────────────────────────────────────────────────────────
      doc.font('Helvetica')
        .fontSize(13)
        .fillColor('#b8c4c0')
        .text('CERTIFICADO DE LOGRO', 0, 115, { align: 'center', characterSpacing: 4 });

      // ── Nombre del estudiante ────────────────────────────────────────────
      doc.font('Helvetica-Bold')
        .fontSize(34)
        .fillColor('#ffffff')
        .text(userName, 0, 145, { align: 'center' });

      // ── Texto principal ──────────────────────────────────────────────────
      doc.font('Helvetica')
        .fontSize(11)
        .fillColor('#b8c4c0')
        .text('ha completado satisfactoriamente', 0, 198, { align: 'center' });

      // ── Etapa ────────────────────────────────────────────────────────────
      doc.font('Helvetica-Bold')
        .fontSize(20)
        .fillColor('#00ed64')
        .text(`Etapa ${stageOrder}: ${stageTitle}`, 0, 218, { align: 'center' });

      doc.font('Helvetica')
        .fontSize(10)
        .fillColor('#b8c4c0')
        .text('del programa de formación en Bases de Datos NoSQL con MongoDB', 0, 250, { align: 'center' });

      // ── Línea divisoria ──────────────────────────────────────────────────
      doc.moveTo(80, 280).lineTo(doc.page.width - 80, 280)
        .lineWidth(0.5).stroke('#00684a');

      // ── Fecha y código ───────────────────────────────────────────────────
      const now = new Date();
      const fecha = now.toLocaleDateString('es-ES', {
        day: '2-digit', month: 'long', year: 'numeric',
      });

      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#698279')
        .text(`Emitido el ${fecha}`, 80, 298, { align: 'left', width: 250 })
        .text(`Código de verificación: ${code}`, doc.page.width / 2, 298, {
          align: 'right',
          width: doc.page.width / 2 - 80,
        });

      doc.end();
    });
  }
}
