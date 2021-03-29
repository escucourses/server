import { logger } from '../config/logger';
import { CustomError, ErrorBody } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public errorBody: ErrorBody) {
    super(errorBody.message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    logger.info(this.errorBody);

    return [{ message: this.message }];
  }
}
