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

// Middlewares
import { errorHandler } from './middlewares/error-handler';

// Routes
import { IndexRoutes } from './routes/index-routes';
import { AuthRoutes } from './routes/auth-routes';

// Errors
import { NotFoundError } from './errors/not-found-error';

createConnection()
  .then(async (connection) => {
    const app = express();
    const port = process.env.PORT || 3000;
    environmentValidation;

    // Routes initialization
    const indexRoutes = new IndexRoutes();
    const authRoutes = new AuthRoutes();

    // Before Middlewares
    app.use(helmet());
    app.use(json());

    // Routes registration
    app.use(indexRoutes.uri, indexRoutes.router);
    app.use(authRoutes.uri, authRoutes.router);

    // Documentation
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

    app.all('*', () => {
      throw new NotFoundError();
    });

    // After middlewares
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
