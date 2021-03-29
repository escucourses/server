// Libraries
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Internal dependencies
import { BaseModel } from './base-model';
import { User } from './user';

@Entity()
export class Course extends BaseModel<Course> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  summary: string;

  @Column({ nullable: false, type: 'text' })
  topics: string;

  @Column({ nullable: false, type: 'text' })
  requirements: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  duration: number;

  @Column({ name: 'is_private', default: true })
  isPrivate: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdCourses, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: User | number;

  @ManyToOne(() => User, (user) => user.createdCourses, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User | number;

  getProtectedProperties(): string[] {
    return [...this.getAuditProperties()];
  }
}
