// Internal dependencies
import { CustomError, ErrorBody } from './custom-error';
import { logger } from '../config/logger';

export class ModelNotFoundError extends CustomError {
  statusCode = 404;

  constructor(public errorBody: ErrorBody) {
    super(errorBody.message);

    Object.setPrototypeOf(this, ModelNotFoundError.prototype);
  }

  serializeErrors() {
    logger.info(this.errorBody);

    return [{ message: this.message }];
  }
}
