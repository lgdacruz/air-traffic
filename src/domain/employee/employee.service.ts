/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Employee } from '../entity/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/employee/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
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
      throw new BadRequestException('Employee already exists');
    }
    if (warNameExist) {
      throw new BadRequestException('War name already exists, choice another');
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
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new BadRequestException('Employee not found');
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      await this.employeeRepository.update(id, updateEmployeeDto);
      return 'Employee updated';
    } catch (error) {
      return new BadRequestException('Employee not found');
    }
  }

  async remove(id: string) {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      await this.employeeRepository.delete(id);
      return 'Employee deleted';
    } catch (error) {
      throw new BadRequestException('Was not possible delete employee');
    }
  }
}
