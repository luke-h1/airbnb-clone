/* eslint-disable no-undef */
import * as faker from 'faker';
import { User } from 'src/entities/User';
import { createTestConn } from 'src/testUtils/createTestConn';
import { TestClient } from 'src/utils/TestClient';
import { Connection } from 'typeorm';

let userId: string;
let conn: Connection;
faker.seed(Date.now() + 3);
const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();
  userId = user.id;
});
afterAll(async () => {
  conn.close();
});

describe('me', () => {
  test('returns null if no cookie is sent', async () => {
    const client = new TestClient(process.env.TEST_HOST);
    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  test('it gets the current logged in user', async () => {
    const client = new TestClient(process.env.TEST_HOST);
    await client.login(email, password);
    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email,
      },
    });
  });
});
