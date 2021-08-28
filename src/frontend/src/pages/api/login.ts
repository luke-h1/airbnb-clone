import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60, // 1 hour: 60 seconds x 60 minutes = 1 hour
      sameSite: 'strict',
      path: '/', // available on any path in the website
    }),
  );
  res.status(200).json({ success: true });
};
