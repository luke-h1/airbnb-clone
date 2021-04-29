import { Request, Response } from 'express';
import { User } from 'src/entities/User';
import { redis } from 'src/redis';

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    res.redirect(`${process.env.FRONTEND_HOST}/login`);
  } else {
    res.send('invalid');
  }
};
