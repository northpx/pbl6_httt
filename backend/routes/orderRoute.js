const express = require('express');
const { isAuth } = require('../utils/isAuth');

const {
  orderBooks,
  getOrderByUserId,
} = require('../controller/orderController');

const router = express.Router();

router.get('/:userId', isAuth, getOrderByUserId);
router.post('/', isAuth, orderBooks);

module.exports = router;
