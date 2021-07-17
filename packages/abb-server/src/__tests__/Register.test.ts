/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../test-utils/testConn';
import { gCall } from '../test-utils/gCall';
import { User } from '../entities/User';
import { redis } from '../shared/redis';

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

const registerMutation = `
mutation Register($options: UserRegisterInput!, $image: Upload!) {
  register(options: $options, image: $image) {
    errors {
      field
      message
    }
    user {
        id
        email
        fullName
        firstName
        lastName
        image
    }
  }
}
`;
// TODO: change code so it's easier to test this

describe('Register', () => {
  const userImage = faker.random.image();
  it('create user', async () => {
    const user = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      image: userImage,
    };

    const r = await gCall({
      source: registerMutation,
      variableValues: {
        options: user,
        image: userImage,
      },
    });
    console.log(r);

    const dbUser = await User.findOne({ where: { email: user.email } });
    console.log('dbUser', dbUser);
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toBe(user.email);
    expect(dbUser!.firstName).toBe(user.firstName);
    expect(dbUser!.lastName).toBe(user.lastName);
    expect(dbUser!.image).toBe(user.image);
  });
});
