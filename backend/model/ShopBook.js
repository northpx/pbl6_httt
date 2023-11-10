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
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    reviews: { type: Number, required: true },
    ratings: { type: Number, required: true },
    sold: { type: Number, required: true },
    expiryDiscount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ShopBook = mongoose.model('ShopBook', shopBookSchema);

module.exports = ShopBook;
