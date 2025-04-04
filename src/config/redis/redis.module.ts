import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost', // ou o nome do container Docker se estiver em rede
        port: 6379,
      },
    }),
  ],
  exports: [BullModule],
})
export class BullConfigModule {}
