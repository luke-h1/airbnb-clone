import { createConnection } from 'typeorm';
import { Listing } from '../entities/Listing';
import { User } from '../entities/User';

export const createTestConn = async (resetDB: boolean = false) => {
  await createConnection({
    type: 'postgres',
    url: process.env.TEST_DATABASE_URL,
    logging: true,
    synchronize: resetDB,
    dropSchema: resetDB,
    entities: [User, Listing],
  });
};
