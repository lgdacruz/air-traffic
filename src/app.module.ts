import { Module } from '@nestjs/common';
import { EmployeeModule } from './domain/employee/employee.module';
import { TaskModule } from './domain/task/task.module';
import { AircraftModule } from './domain/aircraft/aircraft.module';

@Module({
  imports: [EmployeeModule, TaskModule, AircraftModule],
})
export class AppModule {}
