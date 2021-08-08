import express from 'express';
import { admin, protect } from '../middleware/auth';
import {
  login,
  register,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController';

const router = express.Router();
router.route('/').post(register).get(protect, admin, getUsers);
router.post('/login', login);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
