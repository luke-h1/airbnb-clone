/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import faker from 'faker';
import { redis } from '../test-utils/redis';
import { gCall } from '../test-utils/gCall';
import { User } from '../entities/User';
import { testConn } from '../test-utils/testConn';

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
mutation Register($options: UserRegisterInput!, $image: Upload!) {
  register(
    options: $UserRegisterInput
    image: $image
  ) {
    id
    email
    firstName
    lastName
    image
  }
}
`;

describe('Register', () => {
  it('registers a user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image: faker.image.image(),
      imageFileName: faker.name.title(),
    };

    await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser!.firstName).toBe(user.firstName);
    expect(dbUser!.lastName).toBe(user.lastName);
    expect(dbUser!.email).toBe(user.email);
    expect(dbUser!.image).toBe(user.image);
  });
});
