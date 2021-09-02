import { createConnection } from 'typeorm';
import { join } from 'path';
import { Listing } from '../entities/Listing';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname), './migrations/*'],
  entities: [Listing],
  logging: true,
  synchronize: true,
});
