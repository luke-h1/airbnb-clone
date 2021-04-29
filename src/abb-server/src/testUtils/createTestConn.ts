import { Listing } from 'src/entities/Listing';
import { User } from 'src/entities/User';
import { createConnection } from 'typeorm';

export const createTestConn = async (resetDB: boolean = false) => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.TEST_DATABASE_URL,
    logging: true,
    synchronize: resetDB,
    dropSchema: resetDB,
    entities: [User, Listing],
  });
};
