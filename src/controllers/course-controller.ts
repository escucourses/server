// Libraries
import { Request, Response } from 'express';
import { body, param, ValidationChain } from 'express-validator';

// Errors
import { DatabaseError } from '../errors/database-error';
import { ModelNotFoundError } from '../errors/model-not-found-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// Models
import { Course } from '../models/course';

// Internal dependencies
import { CourseAuthorization } from '../services/authorization/course-authorization';
import { logger } from '../config/logger';

export class CourseController {
  public createValidations: ValidationChain[];
  public singleResourceValidations: ValidationChain[];
  public updateValidations: ValidationChain[];
  public authorization: CourseAuthorization;

  constructor() {
    this.authorization = new CourseAuthorization();

    this.createValidations = [
      body('name')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('summary')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('topics')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('requirements')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('description')
        .isLength({ min: 10 })
        .withMessage('Must have a minimum of 10 characters'),
      body('price').isFloat().withMessage('Must be a number (float)'),
    ];

    this.singleResourceValidations = [
      param('id').isNumeric().withMessage('Must be a number'),
    ];

    this.updateValidations = [
      body('name')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('summary')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('topics')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('requirements')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('description')
        .optional()
        .isLength({ min: 10 })
        .withMessage('Must have a minimum of 10 characters'),
      body('price')
        .optional()
        .isFloat()
        .withMessage('Must be a number (float)'),
    ];
  }

  /**
   * Retrieves all the courses
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async index(req: Request, res: Response): Promise<Response> {
    let courses: Course[];

    try {
      courses = await Course.find({ where: { isPrivate: false } });
    } catch (error) {
      throw new DatabaseError({
        file: 'COURSE-CONTROLLER.INDEX',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    return res.send(courses);
  }

  /**
   * Handle the Course creation
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const course = new Course();

    course.setPropertiesFromObject(req.body);
    course.createdBy = course.updatedBy = req.user.id;

    try {
      await course.save();
    } catch (error) {
      throw new DatabaseError({
        file: 'COURSE-CONTROLLER.CREATE',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    return res.status(201).send(course);
  }

  /**
   * Retrieves a single Course
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async show(req: Request, res: Response): Promise<Response> {
    let course: Course;

    try {
      course = await Course.findOneOrFail({
        where: { id: req.params.id, isPrivate: false },
      });
    } catch (error) {
      throw new ModelNotFoundError({
        message: Course.getNotFoundMessage(),
        file: 'COURSE-CONTROLLER.SHOW',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    return res.send(course);
  }

  /**
   * Update's a single resource
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async update(req: Request, res: Response): Promise<Response> {
    let course: Course;

    try {
      course = await Course.findOneOrFail({
        where: { id: req.params.id, isPrivate: false },
      });
    } catch (error) {
      throw new ModelNotFoundError({
        message: Course.getNotFoundMessage(),
        file: 'COURSE-CONTROLLER.UPDATE',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    if (!this.authorization.setUser(req.user).can(course, 'update')) {
      throw new NotAuthorizedError();
    }

    course.setPropertiesFromObject(req.body);
    course.updatedBy = req.user.id;

    try {
      await course.save();
    } catch (error) {
      throw new DatabaseError({
        file: 'COURSE-CONTROLLER.UPDATE',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    return res.send(course);
  }

  /**
   * Deletes a single resource
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    let course: Course;

    try {
      course = await Course.findOneOrFail(req.params.id);
    } catch (error) {
      throw new ModelNotFoundError({
        message: Course.getNotFoundMessage(),
        file: 'COURSE-CONTROLLER.DELETE',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    if (!this.authorization.setUser(req.user).can(course, 'delete')) {
      throw new NotAuthorizedError();
    }

    try {
      await course.remove();
    } catch (error) {
      throw new DatabaseError({
        file: 'COURSE-CONTROLLER.DELETE',
        originalError: error,
        triggeredByUser: req.user.id,
      });
    }

    return res.send(course);
  }
}
