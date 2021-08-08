import jwt from 'jsonwebtoken';
import 'dotenv-safe/config';

const genToken = (id: number) => jwt.sign({ id }, process.env.JWT_SECRET!, {
  expiresIn: '7d',
});

export default genToken;
