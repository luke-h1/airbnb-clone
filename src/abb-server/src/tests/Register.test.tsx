/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import { testConn } from 'src/test-utils/testConn';
import { gCall } from 'src/test-utils/gCall';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      id
      email
    }
  }
`;

describe('Register', () => {
  it('create user', () => {
    gCall({
      source: registerMutation,
      variableValues: {
        data: {
          email: 'test@example.com',
          password: 'idk123',
        },
      },
    });
  });
});
