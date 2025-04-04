import { Task } from 'src/modules/domain/task/entities/task.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['email', 'warName'], { unique: true })
export class Employee {
  @BeforeInsert()
  toLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  warName: string;

  @Column({ type: 'date', nullable: true })
  bornDate: Date;

  @Column()
  email: string;

  @ManyToMany(() => Task, (task) => task.employee)
  task: Task[];
}
