import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
/*
@desc    Create new order
@route   POST /api/orders
@access  Private
*/
const addOrderItems = asyncHandler(async (req: any, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    reservationFee,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    paymentMethod,
    itemsPrice,
    taxPrice,
    reservationFee,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/*
@desc    Get order by ID
@route   GET /api/orders/:id
@access  Private
*/
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
/*
@desc    Update order to paid
@route   GET /api/orders/:id/pay
@access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
/*
@desc    Update order to booked
@route   GET /api/orders/:id/book
@access  Private/Admin
*/
const updateOrderToBooked = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isBooked = true;
    order.bookedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
/*
@desc    Get logged in user booked properties
@route   GET /api/orders/myorders
@access  Private
*/
const getMyOrders = asyncHandler(async (req: any, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
/*
@desc    Get all orders
@route   GET /api/orders
@access  Private/Admin
*/
const getOrders = asyncHandler(async (_, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToBooked,
  getMyOrders,
  getOrders,
};
