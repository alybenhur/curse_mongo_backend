import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaygroundService } from './playground.service';
import { PlaygroundController } from './playground.controller';
import { QueryHistory, QueryHistorySchema } from './playground.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QueryHistory.name, schema: QueryHistorySchema },
    ]),
  ],
  controllers: [PlaygroundController],
  providers: [PlaygroundService],
  exports: [PlaygroundService],
})
export class PlaygroundModule {}
