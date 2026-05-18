import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

export interface ChatResponse {
  reply: string;
  inputTokens: number;
  outputTokens: number;
}

@Injectable()
export class AiService {
  /**
   * Almacén en memoria de API keys por userId.
   * NUNCA se persisten en base de datos.
   * Se destruyen al llamar clearKey() o cuando el proceso reinicia.
   */
  private readonly sessionKeys = new Map<string, string>();

  // ── Gestión de credenciales ───────────────────────────────────────────────

  setKey(userId: string, apiKey: string): void {
    // Validación básica del formato de clave Anthropic
    if (!apiKey.startsWith('sk-ant-')) {
      throw new BadRequestException(
        'La API key debe comenzar con "sk-ant-". Verifica tu clave de Anthropic.',
      );
    }
    this.sessionKeys.set(userId, apiKey);
  }

  clearKey(userId: string): void {
    this.sessionKeys.delete(userId);
  }

  hasKey(userId: string): boolean {
    return this.sessionKeys.has(userId);
  }

  private getKey(userId: string): string {
    const key = this.sessionKeys.get(userId);
    if (!key) {
      throw new UnauthorizedException(
        'No tienes una API key configurada. Ingresa tu clave de Anthropic para usar el asistente.',
      );
    }
    return key;
  }

  // ── Chat con Claude ────────────────────────────────────────────────────────

  async chat(
    userId: string,
    message: string,
    context: {
      lessonTitle?: string;
      lessonContent?: string;
      stageOrder?: number;
      stageName?: string;
      history?: { role: 'user' | 'assistant'; content: string }[];
    },
  ): Promise<ChatResponse> {
    const apiKey = this.getKey(userId);

    const client = new Anthropic({ apiKey });

    // Construir el system prompt con contexto del tutor
    const systemPrompt = this.buildSystemPrompt(context);

    // Construir historial de mensajes
    const messages: Anthropic.Messages.MessageParam[] = [];

    if (context.history && context.history.length > 0) {
      // Incluir hasta los últimos 10 mensajes del historial
      const recentHistory = context.history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: 'user', content: message });

    try {
      const response = await client.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      });

      const reply =
        response.content[0].type === 'text'
          ? response.content[0].text
          : 'No pude generar una respuesta.';

      return {
        reply,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      };
    } catch (err: any) {
      if (err?.status === 401) {
        // Key inválida: eliminarla del store por seguridad
        this.clearKey(userId);
        throw new UnauthorizedException(
          'La API key es inválida o expiró. Por favor ingresa una nueva clave.',
        );
      }
      if (err?.status === 429) {
        throw new ServiceUnavailableException(
          'Has alcanzado el límite de tu API key. Espera un momento e intenta de nuevo.',
        );
      }
      throw new ServiceUnavailableException(
        `Error del servicio de IA: ${err?.message || 'Error desconocido'}`,
      );
    }
  }

  // ── Feedback para ejercicios de modelado (etapa 9) ────────────────────────

  async reviewModeling(
    userId: string,
    requirements: string,
    studentSchema: string,
  ): Promise<ChatResponse> {
    const apiKey = this.getKey(userId);
    const client = new Anthropic({ apiKey });

    const prompt = `Eres un experto en modelado de bases de datos NoSQL con MongoDB.

El estudiante ha diseñado el siguiente esquema para los requisitos dados.
Proporciona retroalimentación constructiva y específica.

REQUISITOS:
${requirements}

ESQUEMA DEL ESTUDIANTE:
${studentSchema}

Evalúa:
1. ¿Usa correctamente embedding vs referencing?
2. ¿Anticipa los patrones de consulta?
3. ¿Evita los antipatrones comunes (arrays ilimitados, documentos gigantes)?
4. ¿El esquema escalaría correctamente?
5. ¿Qué mejorarías y por qué?

Sé específico, usa ejemplos en JSON/MongoDB y da puntuación del 0 al 100.`;

    try {
      const response = await client.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });

      const reply =
        response.content[0].type === 'text'
          ? response.content[0].text
          : 'No pude generar retroalimentación.';

      return {
        reply,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      };
    } catch (err: any) {
      if (err?.status === 401) {
        this.clearKey(userId);
        throw new UnauthorizedException('API key inválida.');
      }
      throw new ServiceUnavailableException(`Error de IA: ${err?.message}`);
    }
  }

  // ── System prompt contextual ───────────────────────────────────────────────

  private buildSystemPrompt(context: {
    lessonTitle?: string;
    lessonContent?: string;
    stageOrder?: number;
    stageName?: string;
  }): string {
    let prompt = `Eres MongoBot, el asistente de aprendizaje de MongoTutor, una plataforma educativa especializada en MongoDB y bases de datos NoSQL.

## Tu rol
- Ayudar a estudiantes a entender conceptos de MongoDB y NoSQL
- Explicar con ejemplos prácticos y código real de MongoDB
- Detectar y corregir errores conceptuales con paciencia
- Adaptar las explicaciones al nivel del estudiante
- Responder SIEMPRE en español

## Reglas
- Si el estudiante pregunta algo fuera del tema de bases de datos/MongoDB, redirige amablemente
- Usa bloques de código MongoDB cuando sea útil (usa triple backtick con javascript o js)
- Sé conciso pero completo — máximo 3-4 párrafos por respuesta
- Siempre ofrece un ejemplo práctico cuando expliques un concepto
- Si detectas un error en el código del estudiante, corrígelo y explica el por qué`;

    if (context.stageOrder && context.stageName) {
      prompt += `\n\n## Contexto actual del estudiante
El estudiante está en la **Etapa ${context.stageOrder}: ${context.stageName}**.`;
    }

    if (context.lessonTitle) {
      prompt += `\nEstá estudiando la lección: **"${context.lessonTitle}"**.`;
    }

    if (context.lessonContent) {
      const snippet = context.lessonContent.slice(0, 800);
      prompt += `\n\nContenido relevante de la lección actual (para contexto):\n${snippet}`;
    }

    prompt += `\n\n¡Recuerda: eres un tutor paciente y motivador! 🍃`;

    return prompt;
  }
}
