/* eslint-disable no-undef */
import { Connection } from 'typeorm';
import { testConn } from 'src/test-utils/testConn';
import { graphql } from 'graphql';
import { gCall } from 'src/test-utils/gCall';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe('Register', () => {
  it('create user', () => {
    gCall({

    });
  });
});
