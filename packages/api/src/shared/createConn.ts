import { createConnection } from 'typeorm';
import path from 'path';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { constants } from './constants';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: !constants.__prod__,
  synchronize: !constants.__prod__,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [User, Property],
});
