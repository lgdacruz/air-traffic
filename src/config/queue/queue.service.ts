// queue.service.ts
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async sendEmailJob(data: {
    to: string | string[];
    subject: string;
    body: string;
  }) {
    await this.emailQueue.add('send-email', data, {
      delay: 1000, // opcional: delay antes do processamento
      attempts: 3, // opcional: número de tentativas em caso de erro
    });
  }
}
