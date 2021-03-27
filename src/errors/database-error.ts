import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Unexpected error while performing database task');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
