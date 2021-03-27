// Libraries
import { Request, Response } from 'express';
import { body, param, ValidationChain } from 'express-validator';

// Constants
import { environment } from '../config/environment';

// Errors
import { DatabaseError } from '../errors/database-error';
import { ModelNotFoundError } from '../errors/model-not-found-error';

// Models
import { Course } from '../models/course';

export class CourseController {
  public createValidations: ValidationChain[];
  public singleResourceValidations: ValidationChain[];

  constructor() {
    this.createValidations = [
      body('name')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('summary')
        .isLength({ min: 2 })
        .withMessage('Must have a minimum of 2 characters'),
      body('topics').notEmpty().withMessage('Topics is required'),
      body('requirements').notEmpty().withMessage("Can't be empty"),
      body('description')
        .isLength({ min: 10 })
        .withMessage('Must have a minimum of 10 characters'),
      body('price').isFloat().withMessage('Must be a number (float)'),
    ];

    this.singleResourceValidations = [
      param('id').isNumeric().withMessage('Must be a number'),
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
    const courses = await Course.find({ where: { isPrivate: false } });

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
      console.log(error);
      throw new DatabaseError();
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
      throw new ModelNotFoundError(Course.getNotFoundMessage());
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
      throw new ModelNotFoundError(Course.getNotFoundMessage());
    }

    course.setPropertiesFromObject(req.body);
    course.updatedBy = req.user.id;

    try {
      await course.save();
    } catch (error) {
      throw new DatabaseError();
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
      throw new ModelNotFoundError(Course.getNotFoundMessage());
    }

    try {
      await course.remove();
    } catch (error) {
      throw new DatabaseError();
    }

    return res.send(course);
  }
}
