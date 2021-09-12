import { createConnection } from 'typeorm';
import { join } from 'path';
import { User } from '../entities/User';
import { Listing } from '../entities/Listing';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname), './migrations/*'],
  entities: [User, Listing],
  logging: true,
  synchronize: true,
});
