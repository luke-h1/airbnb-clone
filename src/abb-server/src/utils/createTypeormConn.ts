import { createConnection } from 'typeorm';
import path from 'path';
import { __prod__ } from '../constants';
import { Listing } from '../entities/Listing';
import { User } from '../entities/User';

export const createTypeormConn = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: __prod__,
    migrations: [path.join(__dirname, './migrations/*.*')],
    entities: [User, Listing],
  });
};
