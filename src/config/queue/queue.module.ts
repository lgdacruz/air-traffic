import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', // nome da fila
    }),
  ],
  providers: [QueueProcessor, QueueService],
  exports: [QueueService],
})
export class QueueModule {}
