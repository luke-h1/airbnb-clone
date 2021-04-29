import { Redis } from 'ioredis';
import { FORGET_PASSWORD_PREFIX } from 'src/constants';
import { v4 } from 'uuid';

export const createForgotPasswordLink = async (
  url: string,
  userId: string,
  redis: Redis,
) => {
  const id = v4();
  await redis.set(
    `${FORGET_PASSWORD_PREFIX}${id}`,
    userId,
    'ex',
    1000 * 60 * 60 * 24 * 3, // user has 3 days to reset their password
  );
  return `${url}/change-password/${id}`;
};
