import { join } from 'path';
import { createConnection } from 'typeorm';
import { User } from '../entities/User';
import { Property } from '../entities/Property';
import { constants } from './constants';

export const createConn = async () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: !constants.__prod__,
  synchronize: !constants.__prod__,
  migrations: [join(__dirname, './migrations/*')],
  entities: [User, Property],
});
