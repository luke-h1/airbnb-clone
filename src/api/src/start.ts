import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express, { Response } from 'express';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import morgan from 'morgan';
import { constants } from './utils/constants';
import { createUserLoader } from './Loaders/UserLoader';
import { createConn } from './utils/createConn';
import { createSchema } from './utils/createSchema';
import { redis } from './utils/redis';
import { seedDatabase } from './utils/seedDatabase';

const start = async () => {
  const conn = await createConn();

  console.log('Connected to DB, running migrations');
  await conn.runMigrations();
  console.log('Migrations ran');
  if (process.env.NODE_ENV === 'development') {
    await seedDatabase();
  }
  const app = express();
  app.use(morgan('dev'));
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
      credentials: true,
    }),
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.set('trust-proxy', 1);
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
        secure: constants.__prod__, // cookie only works in https
        domain: constants.__prod__ ? '.airbb-clone-code.xyz' : undefined, // SSR issues with forwarding cookies
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      resave: false,
    }),
  );
  const apolloServer = new ApolloServer({
    playground: !constants.__prod__,
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
      `Server listening on localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode. GraphQL API available at http://localhost:${process.env.PORT}/graphql`,
    );
  });
};
export default start;
