import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS — acepta múltiples orígenes separados por coma
  // Se eliminan barras finales para evitar mismatch con el header enviado por el navegador
  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''));   // quita trailing slash

  app.enableCors({
    origin: (origin, callback) => {
      // Sin origin → Postman / curl / petición SSR server-side → permitir
      if (!origin) return callback(null, true);
      // Comparar limpiando posible trailing slash del origin recibido también
      const clean = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(clean)) return callback(null, true);
      callback(new Error(`Origin ${origin} no permitido por CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Prefijo global de la API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en: http://localhost:${port}/api`);
}
bootstrap();
