const asyncHandler = require('express-async-handler');
const Order = require('../model/Order');
const CartItem = require('../model/CartItem');

const orderBooks = asyncHandler(async (req, res) => {
  const orderItems = req.body.orderItems.map((item) => ({
    quantity: item.quantity,
    book: item.book._id,
  }));
  try {
    const newOrder = new Order({
      orderItems: orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice,
      user: req.body.userId,
    });
    const order = await newOrder.save();
    const populatedOrder = await Order.findById(order._id).populate(
      'orderItems.book'
    );
    await CartItem.deleteMany({ user: req.body.userId });
    res.status(201).send({ message: 'New Order Created', populatedOrder });
  } catch (error) {
    console.error(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.find({ user: userId }).populate({
    path: 'orderItems.book',
    populate: {
      path: 'book',
      model: 'Book',
    },
  });

  res.status(201).send(orders);
});

module.exports = { orderBooks, getOrderByUserId };
