import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/domain/employee/employee.module';
import { TaskModule } from './modules/domain/task/task.module';
import { TypeOrmConfigModule } from './config/sql/typeorm.module';
import { DynamooseModule } from './config/nosql/dynamoose.module';
import { LogModule } from './modules/domain/log/log.module';
import { BullConfigModule } from './config/redis/redis.module';
import { QueueModule } from './config/queue/queue.module';

@Module({
  imports: [
    BullConfigModule,
    TypeOrmConfigModule,
    DynamooseModule,
    EmployeeModule,
    TaskModule,
    LogModule,
    QueueModule,
  ],
})
export class AppModule {}
