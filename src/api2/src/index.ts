import express, { Response } from 'express';
import cors from 'cors';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { createConn } from './utils/createConn';

const start = async () => {
  await createConn();

  const app = express();

  app.listen('4000', () => console.log('server listening on http://localhost:4000'));

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
      credentials: true,
    }),
  );

  const RedisStore = connectRedis(session);

  app.set('trust-proxy', 1);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: process.env.NODE_ENV === 'production', // cookie only works in https
        domain: process.env.NODE_ENV === 'production' ? '' : undefined,
      },
      saveUninitialized: false,
      secret: 'secret',
      resave: false,
    }),
  );
  app.use(morgan('dev'));

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 15,
    message: 'Too many health check requests',
  });

  app.get('/api/health', limiter, (_, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get('/', (_, res: Response) => {
    res.json({ message: 'Hello 👋' });
  });
};
start().catch((e) => console.error(e));
