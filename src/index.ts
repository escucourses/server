// Libraries
import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import * as swaggerUI from 'swagger-ui-express';

// Internal dependencies
import { environmentValidation } from './config/environment-validation';
import { swaggerDefinition } from './docs/swagger';
import { logger } from './config/logger';

// Middlewares
import { validateAuthentication } from './middlewares/validate-authentication';
import { errorHandler } from './middlewares/error-handler';

// Errors
import { NotFoundError } from './errors/not-found-error';

// Routes
import { IndexRoutes } from './routes/index-routes';
import { AuthRoutes } from './routes/auth-routes';
import { CourseRoutes } from './routes/course-routes';
import { SectionRoutes } from './routes/section-routes';

createConnection()
  .then(async (connection) => {
    const app = express();
    const port = process.env.PORT || 3000;
    environmentValidation;

    // Routes initialization
    const indexRoutes = new IndexRoutes();
    const authRoutes = new AuthRoutes();
    const courseRoutes = new CourseRoutes();
    const sectionRoutes = new SectionRoutes();

    // Before Middlewares
    app.use(helmet());
    app.use(json());

    // Not required Authentication routes
    app.use(indexRoutes.router);
    app.use(authRoutes.router);

    // Documentation
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

    // Authentication Required routes
    app.use(validateAuthentication, courseRoutes.router);
    app.use(validateAuthentication, sectionRoutes.router);

    app.all('*', () => {
      throw new NotFoundError();
    });

    // After middlewares
    app.use(errorHandler);

    app.listen(port, () => {
      logger.info(`Application started on port ${port}`);
    });
  })
  .catch((error) => logger.error(`APPLICATION-START-ERROR — ${error}`));
