import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ProgressModule } from './progress/progress.module';
import { PlaygroundModule } from './playground/playground.module';
import { AiModule } from './ai/ai.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    // Variables de entorno globales
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Conexión a MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/mongo_tutor'),
      }),
      inject: [ConfigService],
    }),
    // Módulos de la aplicación
    AuthModule,
    UsersModule,
    CurriculumModule,
    ProgressModule,
    PlaygroundModule,
    AiModule,
    EvaluationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
