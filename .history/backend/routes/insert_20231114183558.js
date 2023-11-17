const express = require('express');
const {
  getAllBooks,
  getBook,
  searchBooks,
  getBookByShopId,
  deleteBook,
  getCategories,
  updateBook,
  getBookDiscounted,
  getBookSold,
  createBook,
} = require('../controller/bookController');
const router = express.Router();


router.post('/create-book', createBook)

module.exports = router;