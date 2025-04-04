import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const emailExist = await this.employeeRepository.findOne({
      where: { email: dto.email },
    });
    const warNameExist = await this.employeeRepository.findOne({
      where: { warName: dto.warName },
    });

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }
    if (warNameExist) {
      throw new ConflictException('Warname already exists');
    }
    const employee = this.employeeRepository.create(dto);
    return this.employeeRepository.save(employee);
  }

  async findAll() {
    const allEmployee = await this.employeeRepository?.find({
      relations: { task: true },
      select: { task: { title: true, status: true } },
    });
    return allEmployee;
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new BadRequestException('Employee not found');
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return 'Employee updated';
  }

  async remove(id: string) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new BadRequestException('Employee not found');
    }
    await this.employeeRepository.delete(id);
    return 'Employee deleted';
  }
}
