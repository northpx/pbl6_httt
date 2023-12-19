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
  getBookById,
  getProductsByCategories,
  getAllBooksRoot,
  createShopBook,
  updateShopBook,
} = require('../controller/bookController');
const { isAuth } = require('../utils/isAuth');
const { isShop } = require('../utils/isShop');
const router = express.Router();

router.post('/create-book', createBook);
router.post('/shopbook', createShopBook);
router.put('/shopbook', updateShopBook);
router.delete('/shopbook/:bookId', deleteBook);
router.get('/', getAllBooks);
router.get('/bookRoot', getAllBooksRoot);
router.get('/with-discount', getBookDiscounted);
router.get('/with-sold', getBookSold);
router.get('/slug/:slug', getBook);
router.get('/id/:id', getBookById);
router.get('/search', searchBooks);
router.get('/:shopId', getBookByShopId);
router.delete('/:id', isAuth, isShop, deleteBook);
router.put('/:id', isAuth, isShop, updateBook);
router.get('/categories', getCategories);
router.post('/productsByCategory', getProductsByCategories);

module.exports = router;
