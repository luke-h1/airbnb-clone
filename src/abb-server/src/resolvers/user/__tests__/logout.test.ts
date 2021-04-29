/* eslint-disable no-undef */

import * as faker from 'faker';
import { User } from 'src/entities/User';
import { createTestConn } from 'src/testUtils/createTestConn';
import { TestClient } from 'src/utils/TestClient';
import { Connection } from 'typeorm';

let conn: any;
faker.seed(Date.now() + 2);
const email = faker.internet.email();
const password = faker.internet.password();

let userId: string;
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

describe('logout', () => {
  test('multiple sessions at the same time', async () => {
    const session1 = new TestClient(process.env.TEST_HOST);
    const session2 = new TestClient(process.env.TEST_HOST);

    await session1.login(email, password);
    await session2.login(email, password);
    expect(await session1.me()).toEqual(await session2.me());
    await session1.logout();
    expect(await session1.me()).toEqual(await session2.me());
  });

  test('singe session', async () => {
    const client = new TestClient(process.env.TEST_HOST);
    await client.login(email, password);
    const response = await client.me();
    expect(response.data).toEqual({
      me: {
        id: userId,
        email,
      },
    });
    await client.logout();
    const response2 = await client.me();
    expect(response2.data.me).toBeNull();
  });
});
