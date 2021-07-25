import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import { constants } from './shared/constants';
import { createUserLoader } from './Loaders/UserLoader';
import { redis } from './shared/redis';
import { createSchema } from './shared/createSchema';
import { createConn } from './shared/createConn';

const main = async () => {
  const conn = await createConn();
  console.log('Running migrations');
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
    playground: process.env.NODE_ENV !== 'production',
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

  app.listen(process.env.PORT, () => {
    console.log(
      `Server listening on localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

main().catch((err) => {
  console.error(err);
});
