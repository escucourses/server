// Internal dependencies
import { BaseRoute } from './base-route';
import { AuthController } from '../controllers/auth-controller';

// Middlewares
import { validateRequest } from '../middlewares/validate-request';

export class AuthRoutes extends BaseRoute<AuthController> {
  uri = '/auth';

  constructor() {
    super(AuthController);
  }

  public config(): void {
    this.signup();
  }

  public signup() {
    this.router.post(
      '/signup',
      this.controller.signupValidations,
      validateRequest,
      this.controller.signup
    );
  }
}
