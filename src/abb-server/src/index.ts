import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import { createConnection } from 'typeorm';
import path from 'path';
import { listingCacheKey, __prod__ } from './constants';
import { createUserLoader } from './Loaders/UserLoader';
import { redis } from './redis';
import { Listing } from './entities/Listing';
import { User } from './entities/User';
import { createSchema } from './utils/createSchema';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, './migrations/*.*')],
    entities: [User, Listing],
  });
  // await conn.runMigrations();
  const app = express();

  const RedisStore = connectRedis(session);

  // clear cache
  await redis.del(listingCacheKey);
  // fill cache
  const listings = await Listing.find();
  const listingStrings = listings.map((x) => JSON.stringify(x));
  if (listingStrings.length) {
    await redis.lpush(listingCacheKey, ...listingStrings);
  }
  console.log(await redis.lrange(listingCacheKey, 0, -1));

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
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? 'deployed-api' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      resave: false,
    }),
  );

  app.use('/images', express.static('images'));

  app.use(
    cors({
      origin: process.env.FRONTEND_HOST as string,
      credentials: true,
    }),
  );

  const apolloServer = new ApolloServer({
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
