// Internal dependencies
import { Authorization } from '../services/authorization/authorization';

export class BaseController<Resource> {
  protected authorization: Authorization<Resource>;

  public setAuthorization(authorization: Authorization<Resource>) {
    this.authorization = authorization;
  }
}
