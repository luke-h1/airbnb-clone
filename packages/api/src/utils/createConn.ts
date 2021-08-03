import { createConnection } from 'typeorm';
import { join } from 'path';
import { constants } from './constants';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname), './migrations/*'],
  entities: [join(__dirname, './migrations/*')],
  logging: !constants.__prod__,
  // synchronize: !constants.__prod__,
});
