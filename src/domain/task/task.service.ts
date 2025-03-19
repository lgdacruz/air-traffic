import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { In, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { Employee } from '../entity/employee.entity';
import { ModifyListEmployeeDto } from '../dto/task/modify-list-employee.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { employee, title, description, priority } = createTaskDto;
    try {
      // *Verify if task exist
      const task = await this.taskRepository.findOne({
        where: { title },
      });
      if (task) throw new BadRequestException('Task already exist!');

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
      return 'Task created';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: { employee: true },
      select: { employee: { warName: true } },
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

    await this.taskRepository.save(task);

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

    await this.taskRepository.save(task);

    return 'Employee add for the task';
  }
}
