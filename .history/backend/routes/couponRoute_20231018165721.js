const express = require('express');
const { authMiddleware, isSeller } = require('../middleware/auth');
const { createCoupon } = require('../controller/couponController');
const router = express.Router()

router.post('/create-coupon', authMiddleware, isSeller, createCoupon);
router.get()

module.exports = router;