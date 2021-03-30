// Internal dependencies
import { BaseRoute } from './base-route';
import { CourseController } from '../controllers/course-controller';

// Middlewares
import { validateRequest } from '../middlewares/validate-request';

export class CourseRoutes extends BaseRoute<CourseController> {
  constructor() {
    super(CourseController);
  }

  public config(): void {
    this.uri = '/courses';

    this.index();
    this.create();
    this.show();
    this.update();
    this.delete();
  }

  public index() {
    this.router.get(this.uri, (req, res) => this.controller.index(req, res));
  }

  public create() {
    this.router.post(
      this.uri,
      this.controller.createValidations,
      validateRequest,
      (req, res) => this.controller.create(req, res)
    );
  }

  public show() {
    this.router.get(
      `${this.uri}/:id`,
      this.controller.singleResourceValidations,
      validateRequest,
      (req, res) => this.controller.show(req, res)
    );
  }

  public update() {
    this.router.patch(
      `${this.uri}/:id`,
      this.controller.singleResourceValidations,
      this.controller.updateValidations,
      validateRequest,
      (req, res) => this.controller.update(req, res)
    );
  }

  public delete() {
    this.router.delete(
      `${this.uri}/:id`,
      this.controller.singleResourceValidations,
      validateRequest,
      (req, res) => this.controller.delete(req, res)
    );
  }
}
