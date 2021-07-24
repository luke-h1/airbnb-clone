import 'reflect-metadata';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { getConnection } from 'typeorm';
import { constants } from './shared/constants';
import { redis } from './shared/redis';
import { createConn } from './shared/createConn';
import userRoutes from './routes/userRoutes';
import propertyRoutes from './routes/propertyRoutes';
import { upload } from './utils/multer';
import { validateRegister } from './validation/user/validateRegister';
import { User } from './entities/User';
import { validateProperty } from './validation/property/validateProperty';
import { Property } from './entities/Property';

const main = async () => {
  await createConn();
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
      credentials: true,
    }),
  );

  app.set('trust-proxy', 1);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (set to 2 days on prod)
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: constants.__prod__, // cookie only works in https
        domain: constants.__prod__ ? 'deployed-api' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      resave: false,
    }),
  );

  app.use(express.json());

  app.use('/api/users', userRoutes);
  app.use('/api/properties', propertyRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}`);
  });
};
main().catch((e) => {
  console.error(e);
});
