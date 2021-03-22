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
    this.signin();
  }

  public signup() {
    this.router.post(
      '/signup',
      this.controller.signupValidations,
      validateRequest,
      (req, res) => this.controller.signup(req, res)
    );
  }

  public signin() {
    this.router.post(
      '/signin',
      this.controller.signinValidations,
      validateRequest,
      (req, res) => this.controller.signin(req, res)
    );
  }
}
