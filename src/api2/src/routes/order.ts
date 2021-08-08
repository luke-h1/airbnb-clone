import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToBooked,
  getMyOrders,
  getOrders,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/book').put(protect, admin, updateOrderToBooked);

export default router;
