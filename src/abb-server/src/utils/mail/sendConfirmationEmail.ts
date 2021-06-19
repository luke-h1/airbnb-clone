import { v4 } from 'uuid';
import { redis } from '../../redis';

// http://localhost:3000/confirm/<ID>

export const sendConfirmationEmail = async (userId: number, url: string) => {
  const id = v4();
  await redis.set(id, userId, 'ex', 60 * 60 * 24); // 1 day
  return `${url}/confirm/${id}`;
};
