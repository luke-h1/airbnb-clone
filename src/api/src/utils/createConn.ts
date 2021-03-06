import { createConnection } from 'typeorm';
import { join } from 'path';
import { User } from '../entities/User';
import { Property } from '../entities/Property';

export const createConn = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname), './migrations/*'],
  entities: [User, Property],
  logging: true,
  synchronize: true,
});
