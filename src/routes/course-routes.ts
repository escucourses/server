// Internal dependencies
import { BaseRoute } from './base-route';
import { CourseController } from '../controllers/course-controller';

// Middlewares
import { validateRequest } from '../middlewares/validate-request';

export class CourseRoutes extends BaseRoute<CourseController> {
  uri = '/courses';

  constructor() {
    super(CourseController);
  }

  public config(): void {
    this.index();
    this.create();
    this.show();
    this.update();
    this.delete();
  }

  public index() {
    this.router.get('/', (req, res) => this.controller.index(req, res));
  }

  public create() {
    this.router.post(
      '/',
      this.controller.createValidations,
      validateRequest,
      (req, res) => this.controller.create(req, res)
    );
  }

  public show() {
    this.router.get(
      '/:id',
      this.controller.singleResourceValidations,
      validateRequest,
      (req, res) => this.controller.show(req, res)
    );
  }

  public update() {
    this.router.patch(
      '/:id',
      this.controller.singleResourceValidations,
      this.controller.updateValidations,
      validateRequest,
      (req, res) => this.controller.update(req, res)
    );
  }

  public delete() {
    this.router.delete(
      '/:id',
      this.controller.singleResourceValidations,
      validateRequest,
      (req, res) => this.controller.delete(req, res)
    );
  }
}
