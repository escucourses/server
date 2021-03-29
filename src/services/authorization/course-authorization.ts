// Internal dependencies
import { Authorization } from './authorization';

// Models
import { Course } from '../../models/course';
import { User } from '../../models/user';

export class CourseAuthorization extends Authorization<Course> {
  public update(course: Course) {
    return this.user.id === (course.createdBy as User).id;
  }
}
