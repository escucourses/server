// Libraries
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Course } from './course';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  birthday: Date;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // jsonwebtoken
  token: string;

  @OneToMany(() => Course, (course) => course.createdBy)
  createdCourses: Course[];

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (typeof this.password !== 'undefined') {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }
}
