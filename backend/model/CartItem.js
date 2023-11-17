const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopBook',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
