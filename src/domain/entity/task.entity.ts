import { Employee } from 'src/domain/entity/employee.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @BeforeInsert()
  statusPending() {
    this.status = 'pending';
    if (this.priority > 5) {
      this.priority = 5;
    }
    if (!this.priority) {
      this.priority = 0;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  priority: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Employee, (employee) => employee.task)
  @JoinTable()
  employee: Employee[];
}
