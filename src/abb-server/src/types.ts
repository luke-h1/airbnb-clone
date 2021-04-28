import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createUserLoader } from './Loaders/UserLoader';

export type MyContext = {
  req: Request & { session: any };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
