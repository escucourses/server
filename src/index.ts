import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as helmet from 'helmet';
import { json } from 'body-parser';

createConnection()
  .then(async (connection) => {
    const app = express();
    const port = process.env.PORT || 3000;

    // Middlewares
    app.use(helmet());
    app.use(json());

    app.get('/', (req, res) => {
      res.send({ message: 'Test route!' });
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
