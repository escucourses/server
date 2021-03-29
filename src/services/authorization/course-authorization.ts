// Internal dependencies
import { Authorization } from './authorization';

// Models
import { Course } from '../../models/course';

export class CourseAuthorization extends Authorization<Course> {
  /**
   * Determines wether an user can update a given Course
   *
   * @param { Course } course
   *
   * @return { boolean }
   */
  public update(course: Course): boolean {
    return this.user.id === course.createdBy;
  }

  /**
   * Determines wether an user can delete a given Course
   *
   * @param { Course } course
   *
   * @return { boolean }
   */
  public delete(course: Course): boolean {
    return this.user.id === course.createdBy;
  }
}
