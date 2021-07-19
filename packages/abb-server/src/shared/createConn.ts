import { createConnection } from 'typeorm';
import path from 'path';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { constants } from '../shared/constants';

export const createConn = async () => await createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: !constants.__prod__,
  synchronize: !constants.__prod__,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [User, Property],
});
