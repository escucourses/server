// Libraries
import * as dotenv from 'dotenv';
import * as envalid from 'envalid';

dotenv.config();

export const environmentValidation = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str(),
  JWT_SECRET: envalid.str(),
});
