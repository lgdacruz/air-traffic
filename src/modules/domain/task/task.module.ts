import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Employee } from '../employee/entities/employee.entity';
import { LogModule } from '../log/log.module';
import { QueueModule } from 'src/config/queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Employee]),
    LogModule,
    QueueModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
