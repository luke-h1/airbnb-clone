import path from 'path';
import express from 'express';
import morgan from 'morgan';
import createConn from './utils/createConn';
import { constants } from './constants';
import { errorHandler, notFound } from './middleware/error';

const main = async () => {
  createConn();
  const app = express();

  if (!constants.__prod__) {
    app.use(morgan('dev'));
  }

  app.use(express.json());

  app.use('/api/properties');
  app.use('/api/users');
  app.use('/api/orders');
  app.use('/api/upload');

  app.use('/uploads', express.static(path.basename('..', '/uploads')));

  app.use(notFound);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log('running');
  });
};
