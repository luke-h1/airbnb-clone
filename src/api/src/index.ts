import path from 'path';
import express from 'express';
import morgan from 'morgan';
import createConn from './utils/createConn';
import { constants } from './constants';
import { errorHandler, notFound } from './middleware/error';

import propertyRoutes from './routes/property';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';
import uploadRoutes from './routes/upload';

const main = async () => {
  createConn();
  const app = express();

  if (!constants.__prod__) {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.use('/api/properties', propertyRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/uploads', express.static(path.basename('..', '/uploads')));
  app.use(notFound);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`api listening on http://localhost:${process.env.PORT}`);
  });
};
main().catch((e: any) => {
  console.error(e);
});
