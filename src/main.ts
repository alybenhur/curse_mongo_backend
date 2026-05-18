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

  // CORS para el frontend Nuxt
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const normalizedUrl = frontendUrl.startsWith('http')
    ? frontendUrl
    : `https://${frontendUrl}`;

  app.enableCors({
    origin: normalizedUrl,
    credentials: true,
  });

  // Prefijo global de la API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en: http://localhost:${port}/api`);
}
bootstrap();
