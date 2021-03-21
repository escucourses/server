// Libraries
import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};
