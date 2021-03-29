// Libraries
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

// Internal dependencies
import { BaseModel } from './base-model';
import { User } from './user';
import { Course } from './course';

@Entity()
@Unique(['courseId', 'order'])
export class Section extends BaseModel<Section> {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.sections)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'int', nullable: false, name: 'course_id' })
  courseId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'int', nullable: false, name: 'created_by' })
  createdBy: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @Column({ type: 'int', nullable: false, name: 'updated_by' })
  updatedBy: number;

  getProtectedProperties(): string[] {
    return [...this.getAuditProperties()];
  }
}
