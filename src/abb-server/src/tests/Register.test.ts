/* eslint-disable no-undef */

import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../test-utils/testConn';
import { gCall } from '../test-utils/gCall';
import { User } from '../entities/User';
import { redis } from '../redis';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
  if (redis.status === 'end') {
    await redis.connect();
  }
});
afterAll(async () => {
  await conn.close();
  redis.disconnect();
});

const registerMutation = `
mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      email
      createdAt
    }
  }
}
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const r = await gCall({
      source: registerMutation,
      variableValues: {
        options: user,
      },
    });
    console.log(r);

    // expect(r).toMatchObject({
    //   data: {
    //     register: {
    //       errors: null,
    //       user: {
    //         createdAt: Date.now(),
    //         email: user.email,
    //         id: 1,
    //       },
    //     },
    //   },
    // });

    const dbUser = await User.findOne({ where: { email: user.email } });
    console.log('dbUser', dbUser);
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.email).toBe(user.email);
  });
});
