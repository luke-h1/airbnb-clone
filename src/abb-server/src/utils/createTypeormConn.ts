import { __prod__ } from 'src/constants';
import { Listing } from 'src/entities/Listing';
import { User } from 'src/entities/User';
import { createConnection } from 'typeorm';
import path from 'path';

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
