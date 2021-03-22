import { CustomError } from './custom-error';

export class ModelNotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ModelNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
