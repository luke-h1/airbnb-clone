import { main } from '../startServer';

export const setup = async () => {
  await main();
  process.env.TEST_HOST = `http://127.0.0.1:${process.env.PORT}`;
};
