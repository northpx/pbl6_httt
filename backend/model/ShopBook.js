const mongoose = require('mongoose');

const shopBookSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    quantity: { type: Number, required: true },
    reviews: { type: Number },
    ratings: { type: Number },
    sold: { type: Number },
    expiryDiscount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ShopBook = mongoose.model('ShopBook', shopBookSchema);

module.exports = ShopBook;
