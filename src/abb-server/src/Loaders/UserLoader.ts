import DataLoader from 'dataloader';
import { User } from '../entities/User';

export const createUserLoader = () => new DataLoader<number, User>(async (userIds) => {
  const users = await User.findByIds(userIds as number[]);
  const userIdToUser: Record<string, User> = {};
  users.forEach((u) => {
    userIdToUser[u.id] = u;
  });
  const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
  console.log('sortedUsers', sortedUsers);
  return sortedUsers;
});
