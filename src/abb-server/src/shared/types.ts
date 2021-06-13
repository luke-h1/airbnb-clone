import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createUserLoader } from '../Loaders/UserLoader';

export type MyContext = {
  req: Request & { session: { userId: number } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  url: string;
};
