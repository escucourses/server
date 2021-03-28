// Libraries
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Constants
import { environment } from '../config/environment';

// Errors
import { AuthenticationError } from '../errors/authentication-error';
import { ModelNotFoundError } from '../errors/model-not-found-error';

// Models
import { User } from '../models/user';

// Internal dependencies
import { logger } from '../config/logger';

const verifyToken = promisify(jwt.verify);

interface Payload {
  id: number;
  exp: number;
  iat: number;
}

export const validateAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  let decodedPayload: Payload;

  if (!token) {
    throw new AuthenticationError();
  }

  token = token.split(' ')[1];

  try {
    decodedPayload = (await verifyToken(
      token,
      environment.jwtSecret
    )) as Payload;
  } catch (error) {
    logger.info(
      `VALIDATE-AUTHENTICATION-MIDDLEWARE__DECODING-JWT-ERROR — ${error}`
    );

    throw new AuthenticationError();
  }

  try {
    req.user = await User.findOneOrFail(decodedPayload.id);
  } catch (error) {
    logger.warn(
      `VALIDATE-AUTHENTICATION-MIDDLEWARE__FETCHING-REQUEST-USER-ERROR — ${error}`
    );

    throw new ModelNotFoundError(
      'The user given in the token no longer exists'
    );
  }

  next();
};
