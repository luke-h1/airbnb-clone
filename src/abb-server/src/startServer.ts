import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express, { request } from 'express';
import session from 'express-session';
import { buildSchema } from 'type-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redis } from './redis';
import { listingCacheKey, __prod__ } from './constants';
import { Listing } from './entities/Listing';
import { createUserLoader } from './Loaders/UserLoader';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user/user';
import { confirmEmail } from './routes/confirmEmail';
import { createTestConn } from './testUtils/createTestConn';
import { createTypeormConn } from './utils/createTypeormConn';

export const startServer = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  if (process.env.NODE_ENV === 'test') {
    await redis.flushall();
  }

  const pubsub = new RedisPubSub(
    process.env.NODE_ENV === 'production'
      ? {
        connection: process.env.REDIS_URL as any,
      }
      : {},
  );

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
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'test'
          ? '*'
          : (process.env.FRONTEND_HOST as string),
      credentials: true,
    }),
  );

  app.use('/images', express.static('images'));

  app.get('/confirm/:id', confirmEmail);

  if (process.env.NODE_ENV === 'test') {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }

  //   clear cache
  await redis.del(listingCacheKey);
  // fill cache
  const listings = await Listing.find();
  const listingStrings = listings.map((x) => JSON.stringify(x));
  if (listingStrings.length) {
    await redis.lpush(listingCacheKey, ...listingStrings);
  }
  // console.log(await redis.lrange(listingCacheKey, 0, -1));

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
      session: request ? request.session : undefined,
      url: request ? `${request.protocol}://${request.get('host')}` : '',
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
