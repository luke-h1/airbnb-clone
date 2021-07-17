/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../test-utils/testConn';
import { redis } from '../shared/redis';
import { gCall } from '../test-utils/gCall';
import { User } from '../entities/User';

let conn: Connection;
beforeAll(async () => {
  // @ts-ignore
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
        email
    }
}
`;

describe('me', () => {
  it('me query returns current logged in user', async () => {
    const user = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.random.image(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          email: user.email,
        },
      },
    });
  });
  it('me query returns null when user enters bad data for register', async () => {
    await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.random.image(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
    });
    console.log('response', response);
    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
