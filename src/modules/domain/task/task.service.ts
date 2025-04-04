import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ModifyListEmployeeDto } from './dtos/modify-list-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createLogDto } from '../log/dtos/create-log.dto';
import { QueueService } from 'src/config/queue/queue.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @Inject()
    private logService: QueueService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { employee, title, description, priority } = createTaskDto;
    try {
      // *Verify if task exist
      const task = await this.taskRepository.findOne({
        where: { title },
      });
      if (task) {
        const microserviceUrl = new URL(
          `${process.env.LOG_MICROSERVICE_URL!}/log`,
        );

        const bodyUrl: createLogDto = {
          project: 'AirTraffic',
          logType: 'Error',
          message: 'Task already exist',
          tag: 'contain',
          statusCode: 409,
        };
        await fetch(microserviceUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyUrl),
        });

        throw new ConflictException('Já criado');
      }
      // *Verify if all employees exist
      const employees = await this.employeeRepository.findBy({
        id: In(employee),
      });
      if (employees.length !== employee.length)
        throw new NotFoundException('One or more employees does not exist!');

      // *Create and save task
      const newTask = this.taskRepository.create({
        title,
        description,
        priority,
        employee: employees,
      });
      await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: { employee: true },
      select: { employee: true },
    });
  }

  async findOne(id: string) {
    return await this.taskRepository.find({
      where: { id },
      relations: { employee: true },
      select: { employee: { id: true } },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return 'Task modified';
  }

  async remove(id: string) {
    await this.taskRepository.delete({ id });
    return 'Task removed';
  }

  async modifyEmployeeInTask(
    id: string,
    modifyEmployee: ModifyListEmployeeDto,
  ) {
    if (!modifyEmployee.operation) {
      throw new BadRequestException(
        'Insert the type of operation you want execute',
      );
    }

    const empoyeeArray = await this.employeeRepository.find({
      where: { id: In(modifyEmployee.employeesId) },
    });

    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { employee: true },
    });
    if (!task) throw new NotFoundException('Task does not exist');

    // *Add Employee to the task
    if (modifyEmployee.operation === 'add') {
      task.employee.forEach((eachEmployee) => {
        if (modifyEmployee.employeesId.includes(eachEmployee.id)) {
          throw new BadRequestException(
            'One or more employees already is in the task',
          );
        }
      });

      const newEmployees = task.employee.concat(empoyeeArray);
      task.employee = newEmployees;
    }

    // *Remove Employee from the task
    if (modifyEmployee.operation === 'remove') {
      if (task.employee.length < 1) {
        throw new BadRequestException('This task does not have employee yet');
      }

      if (empoyeeArray.length !== modifyEmployee.employeesId.length)
        throw new NotFoundException(
          'One or more employees does not exist in this task, verify the list',
        );

      const arrayIdsEmployees = task.employee.map((e) => e.id);
      modifyEmployee.employeesId.forEach((e) => {
        if (arrayIdsEmployees.indexOf(e) === -1) {
          throw new BadRequestException(
            'One or more employees does not exist in this task, verify the list 2',
          );
        }
      });

      task.employee.forEach((eachEmployee) => {
        if (modifyEmployee.employeesId.includes(eachEmployee.id)) {
          const employeeBeenRemoved = task.employee.indexOf(eachEmployee);
          task.employee.splice(employeeBeenRemoved, 1);
        }
      });
    }

    const tasksaved = await this.taskRepository.save(task);
    // *Send email (queue) to employee
    if (tasksaved) {
      await this.logService.sendEmailJob({
        to: empoyeeArray.map((eachEmployee) => eachEmployee.email),
        subject: 'Task add',
        body: `The task ${task.title} was add to you`,
      });
    }

    return 'Employees list change succsess';
  }

  async addEmployee(id: string, employeeId: string) {
    const empoyee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!empoyee) throw new NotFoundException('Employee does not exist');

    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { employee: true },
    });

    if (!task) throw new NotFoundException('Task does not exist');
    if (task.employee.some((e) => e.id === employeeId)) {
      throw new BadRequestException('Employee already is in the task');
    }

    task.employee.push(empoyee);

    const tasksaved = await this.taskRepository.save(task);

    // *Send email to employee
    if (tasksaved) {
      await this.logService.sendEmailJob({
        to: empoyee.email,
        subject: 'Task add',
        body: `The task ${task.title} was add to you`,
      });

      return 'Employee add success';
    }

    return 'Employee add for the task';
  }
}
