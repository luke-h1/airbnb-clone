/* eslint-disable */
import Redis from 'ioredis';
import * as faker from 'faker';
import { createTestConn } from 'src/testUtils/createTestConn';
import { User } from 'src/entities/User';
import { TestClient } from 'src/utils/TestClient';
// @ts-ignore
let conn: { close: () => void };
export const redis = new Redis();
faker.seed(Date.now() + 0);
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();

let userId: string;

beforeAll(async () => {
  conn = (await createTestConn()) as any;
  const user = await User.create({
    email,
    password,
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

describe('forgot password', () => {
  test('it works', async () => {
    const client = new TestClient(process.env.TEST_HOST);

    // lock account
  });
});
