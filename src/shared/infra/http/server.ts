import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/infra/typeorm/index';
import uploadConfig from '@config/upload';
import AppError from '@shared/erros/AppError';
import '@shared/infra/typeorm';
import routes from './routes';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
