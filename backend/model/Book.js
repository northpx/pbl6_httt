const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    categories: [{ type: String, required: true }],
    description: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
