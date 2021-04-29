import { Redis } from 'ioredis';
import { reidSessionPrefix, userSessionIdPrefix } from 'src/constants';

export const removeAllUserSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${userSessionIdPrefix}${userId}`,
    0,
    -1,
  );
  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${reidSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
