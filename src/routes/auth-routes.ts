// Internal dependencies
import { BaseRoute } from './base-route';
import { AuthController } from '../controllers/auth-controller';

// Middlewares
import { validateRequest } from '../middlewares/validate-request';

export class AuthRoutes extends BaseRoute<AuthController> {
  constructor() {
    super(AuthController);
  }

  public config(): void {
    this.uri = '/auth';

    this.signup();
    this.signin();
  }

  public signup() {
    this.router.post(
      `${this.uri}/signup`,
      this.controller.signupValidations,
      validateRequest,
      (req, res) => this.controller.signup(req, res)
    );
  }

  public signin() {
    this.router.post(
      `${this.uri}/signin`,
      this.controller.signinValidations,
      validateRequest,
      (req, res) => this.controller.signin(req, res)
    );
  }
}
