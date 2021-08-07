import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express, { Response } from 'express';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import rateLimit from 'express-rate-limit';
import { createConnection } from 'typeorm';
import path from 'path';
import { constants } from './utils/constants';
import { createUserLoader } from './Loaders/UserLoader';
import { redis } from './utils/redis';
import { createSchema } from './utils/createSchema';
import { User } from './entities/User';
import { Property } from './entities/Property';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Property],
    logging: !constants.__prod__,
    synchronize: !constants.__prod__,
  });
  console.log('Connected to DB, running migrations');
  await conn.runMigrations();
  console.log('Migrations ran');
  const app = express();

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
        maxAge: 1000 * 60 * 60 * 24 * 4, // 4 days
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: constants.__prod__,
        domain: constants.__prod__ ? 'api.airbb-clone-code.xyz' : undefined,
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
      `Server listening on localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

main().catch((err) => {
  console.error(err);
});
