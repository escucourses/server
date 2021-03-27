import { CustomError } from './custom-error';

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid authentication token');

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
