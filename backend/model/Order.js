const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        quantity: { type: Number, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ShopBook',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      commune: { type: String, required: true },
      streetName: { type: String, required: true },
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
