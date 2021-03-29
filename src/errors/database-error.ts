// Internal dependencies
import { CustomError, ErrorBody } from './custom-error';
import { logger } from '../config/logger';

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public errorBody: ErrorBody) {
    super('Unexpected error while performing database task');

    errorBody.message = this.message;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    logger.error(this.errorBody);

    return [{ message: this.message }];
  }
}
