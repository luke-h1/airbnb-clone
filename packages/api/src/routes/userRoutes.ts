import express from 'express';

import {
  me, login, logout, register,
} from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.route('/').get(isAuth, me);

router.route('/logout').get(logout);

router.post('/login', login);

router.post('/register', register);
export default router;
