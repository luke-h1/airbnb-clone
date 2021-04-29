import { AddressInfo } from 'net';
import { startServer } from '../startServer';

export const setup = async () => {
  const app = await startServer();
  process.env.TEST_HOST = `http://127.0.0.1:${process.env.PORT}`;
};
