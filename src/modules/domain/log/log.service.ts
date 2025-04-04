import { Injectable } from '@nestjs/common';
import { createLogDto } from './dtos/create-log.dto';
import { LogModel } from './entities/log.entity';

@Injectable()
export class LogService {
  async create(CreateLogDto: createLogDto) {
    const newLogcreated = new LogModel(CreateLogDto);
    await newLogcreated.save();
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
