/* eslint-disable no-undef */
import * as faker from 'faker';
import { User } from '../../../entities/User';
import { createTestConn } from '../../../testUtils/createTestConn';
import { TestClient } from '../../../utils/TestClient';
import { confirmEmailError, invalidLogin } from '../errorMessages';

const email = faker.internet.email();
const password = faker.internet.password();

const client = new TestClient(process.env.TEST_HOST);

let conn: any;
let response;

beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  conn.close();
});

const loginExpectError = async (e: string, p: string, errMsg: string) => {
  response = await client.login(e, p);

  expect(response.data).toEqual({
    login: [
      {
        path: 'email',
        message: errMsg,
      },
    ],
  });

  describe('login', () => {
    test('email not found sends back error', async () => {
      await loginExpectError(
        faker.internet.email(),
        faker.internet.password(),
        invalidLogin,
      );
    });

    test('email not confirmed', async () => {
      await client.register(email, password);

      await loginExpectError(email, password, confirmEmailError);

      await User.update({ email }, { confirmed: true });

      await loginExpectError(email, faker.internet.password(), invalidLogin);

      response = await client.login(email, password);

      expect(response.data).toEqual({ login: null });
    });
  });
};
