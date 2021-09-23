import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express, { Response } from 'express';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import morgan from 'morgan';
import Redis from 'ioredis';
import { constants } from './utils/constants';
import { createUserLoader } from './Loaders/UserLoader';
import { createConn } from './utils/createConn';
import { createSchema } from './utils/createSchema';

const main = async () => {
  await createConn();
  const app = express();
  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
      credentials: true,
    }),
  );

  const RedisStore = connectRedis(session);

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.set('trust-proxy', 1);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: constants.isProd
          ? 3 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000, // 3 days in prod and 7 days in dev
        httpOnly: true,
        sameSite: 'lax',
        secure: constants.isProd,
        domain: constants.isProd ? '.airbb-clone-code.xyz' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      resave: false,
    }),
  );
  app.use(morgan('dev'));

  const apolloServer = new ApolloServer({
    playground: !constants.isProd,
    uploads: false,
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 15,
    message: 'Too many health check requests',
  });

  app.get('/api/health', limiter, (_, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server listening on localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
    );
  });
};
main().catch((e) => console.error(e));
