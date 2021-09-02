import { Request, Response } from 'express';

export type Context = {
  req: Request;
  res: Response;
  url: string;
  uid: string | null;
};
export interface AuthorizedContext extends Context {
  uid: string;
}
