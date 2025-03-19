import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from '../providers/task.provider';
import { DatabaseModule } from 'src/db/db.module';
import { employeeProviders } from '../providers/employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...taskProviders, ...employeeProviders, TaskService],
})
export class TaskModule {}
