import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { DatabaseModule } from 'src/db/db.module';
import { employeeProviders } from '../providers/employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [...employeeProviders, EmployeeService],
})
export class EmployeeModule {}
