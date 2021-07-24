import bcrypt from 'bcryptjs';
import { getConnection } from 'typeorm';
import { constants } from '../shared/constants';
import { validateRegister } from '../validation/user/validateRegister';
import { User } from '../entities/User';

const me = async (req, res) => {
  if (!req.session.userId) {
    return null;
  }
  const user = await User.findOne(req.session.userId);
  res.status(200).json({ user });
};

const register = async (req, res) => {
  const { options } = req.body;
  const errors = validateRegister(options);
  if (errors) {
    res.status(400).json({ errors });
  }

  const hashedPassword = await bcrypt.hash(options.password, 10);
  let user;
  try {
    const { image } = options;
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        password: hashedPassword,
        image: '',
      })
      .returning('*')
      .execute();
    user = result.raw[0];
  } catch (e) {
    if (e.code === '23505') {
      res.status(400).json({
        errors: [
          {
            field: 'email',
            message: 'email already taken',
          },
        ],
      });
    }
  }
  // this will set a cookie on the user & log them in
  req.session.userId = user.id;
  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { options } = req.body;
  const { email, password } = options;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400).json({
      errors: [
        {
          field: 'email',
          message: "That email doesn't exist",
        },
      ],
    });
  }
  const valid = await bcrypt.compare(user!.password, password);
  if (!valid) {
    res.status(400).json({
      errors: [
        {
          field: 'password',
          message: 'Incorrect credentials',
        },
      ],
    });
  }
  req.session.userId = user!.id;
  res.status(200).json({ user });
};

const logout = async (req, res) => new Promise((resolve) => req.session.destroy((e: any) => {
  res.clearCookie(constants.COOKIE_NAME);
  if (e) {
    console.log('LOGOUT ERROR', e);
    resolve(false);
    return;
  }
  resolve(true);
  res.status(200).json({ ok: true });
}));
export {
  me, register, login, logout,
};
