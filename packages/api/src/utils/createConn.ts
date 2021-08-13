import { createConnection } from 'typeorm';
import { join } from 'path';
import { User } from '../entities/User';
import { Property } from '../entities/Property';
import { constants } from './constants';
import { Like } from '../entities/Like';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname), './migrations/*'],
  entities: [User, Property, Like],
  logging: !constants.__prod__,
  synchronize: !constants.__prod__,
});
