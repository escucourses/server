// Libraries
import * as pino from 'pino';

// Internal dependencies
import { environment } from './environment';

export const logger = pino({
  level: environment.environment === 'production' ? 'info' : 'debug',
});
