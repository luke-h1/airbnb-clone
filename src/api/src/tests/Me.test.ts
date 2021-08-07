/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import faker from 'faker';

import { testConn } from '../test-utils/testConn';
import { gCall } from '../test-utils/gCall';
import { User } from '../entities/User';
import { redis } from '../utils/redis';

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

const meQuery = `
{
    me {
       id  
       firstName
       lastName
       image
       email
    }
}
`;

describe('me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      imageFileName: faker.internet.avatar(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    console.log(response);
    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          email: user.email,
        },
      },
    });
  });
  it('return null', async () => {
    await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.internet.avatar(),
      imageFileName: faker.internet.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
    });
    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
