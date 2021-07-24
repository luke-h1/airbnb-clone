import express from 'express';

import {
  me, login, logout,
} from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.route('/').get(isAuth, me).get(logout);

router.post('/login', login);

export default router;
