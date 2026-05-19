import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaygroundService } from './playground.service';
import { PlaygroundController } from './playground.controller';
import { QueryHistory, QueryHistorySchema } from './playground.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QueryHistory.name, schema: QueryHistorySchema },
    ]),
    UsersModule,   // provee UsersService (con getDecryptedAtlasUri)
  ],
  controllers: [PlaygroundController],
  providers: [PlaygroundService],
  exports: [PlaygroundService],
})
export class PlaygroundModule {}
