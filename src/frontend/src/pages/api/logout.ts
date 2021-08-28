import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0), // date in past
      sameSite: 'strict',
      path: '/', // available on any path in the website
    }),
  );
  res.status(200).json({ ok: true });
};
