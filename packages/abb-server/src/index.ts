import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import { createConnection } from 'typeorm';
import path from 'path';
import { graphqlUploadExpress } from 'graphql-upload';
import { constants } from './shared/constants';
import { createUserLoader } from './Loaders/UserLoader';
import { redis } from './shared/redis';
import { Property } from './entities/Property';
import { User } from './entities/User';
import { createSchema } from './shared/createSchema';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !constants.__prod__,
    synchronize: !constants.__prod__,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Property],
  });
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
      credentials: true,
    }),
  );

  // images
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

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

  const apolloServer = new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    uploads: false, // disable apollo uploads
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
    console.log(`Server listening on localhost:${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
