import { Redis } from 'ioredis';
import { constants } from '../shared/constants';

export const removeAllUserSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${constants.userSessionIdPrefix}${userId}`,
    0,
    -1,
  );
  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${constants.redisSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
