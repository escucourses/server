// Libraries
import { Request, Response, NextFunction } from 'express';

// Internal dependencies
import { logger } from '../config/logger';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  logger.error(err);

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
