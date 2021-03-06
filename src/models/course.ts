// Libraries
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

// Internal dependencies
import { BaseModel } from './base-model';
import { Section } from './section';
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

  @ManyToOne(() => User, (user) => user.createdCourses)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'int', nullable: false, name: 'created_by' })
  createdBy: number;

  @ManyToOne(() => User, (user) => user.createdCourses)
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @Column({ type: 'int', nullable: false, name: 'updated_by' })
  updatedBy: number;

  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];

  getProtectedProperties(): string[] {
    return [...this.getAuditProperties()];
  }
}
