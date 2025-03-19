import { Task } from 'src/domain/entity/task.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @BeforeInsert()
  toUpperCase() {
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

  @Column()
  degree: string;

  @Column()
  companyName: string;

  @ManyToMany(() => Task, (task) => task.employee)
  task: Task[];
}
