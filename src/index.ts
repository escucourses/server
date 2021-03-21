// Libraries
import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as helmet from 'helmet';
import { json } from 'body-parser';

// Middlewares
import { errorHandler } from './middlewares/error-handler';

// Errors
import { NotFoundError } from './errors/not-found-error';

createConnection()
  .then(async (connection) => {
    const app = express();
    const port = process.env.PORT || 3000;

    // Before Middlewares
    app.use(helmet());
    app.use(json());

    app.get('/', (req, res) => {
      res.send({ message: 'Test route!' });
    });

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
