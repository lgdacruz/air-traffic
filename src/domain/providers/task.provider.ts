import { DataSource } from 'typeorm';
import { Task } from '../entity/task.entity';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
