import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import { buildSchema } from 'type-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { __prod__ } from './constants';
import { createUserLoader } from './Loaders/UserLoader';
import { HelloResolver } from './resolvers/hello';
import { createTestConn } from './testUtils/createTestConn';
import { createTypeormConn } from './utils/createTypeormConn';
import { redis } from './redis';
import { confirmEmail } from './routes/confirmEmail';
import { UserResolver } from './resolvers/user/user';

export const main = async () => {
  if (process.env.NODE_ENV === 'test') {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }
  // await conn.runMigrations();
  const app = express();
  app.use('/images', express.static('images'));

  app.get('/confirm/:id', confirmEmail);

  const RedisStore = connectRedis(session);

  const pubsub = new RedisPubSub({
    connection: process.env.REDIS_URL as any,
  });

  // const redis = new Redis(process.env.REDIS_URL);

  // //   clear cache
  // await redis.del(listingCacheKey);
  // // fill cache
  // const listings = await Listing.find();
  // const listingStrings = listings.map(x => JSON.stringify(x));
  // if (listingStrings.length) {
  //   await redis.lpush(listingCacheKey, ...listingStrings);
  // }
  // console.log(await redis.lrange(listingCacheKey, 0, -1));

  app.set('trust-proxy', 1);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? 'deployed-api' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );

  app.use('/images', express.static('images'));

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'test'
          ? '*'
          : (process.env.FRONTEND_HOST as string),
      credentials: true,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      pubsub,
    }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}`);
  });
  return app;
};
