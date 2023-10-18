const express = require('express');
const { authMiddleware, isSeller } = require('../middleware/auth');
const { createCoupon } = require('../controller/couponController');
const router = express.Router()

router.post('/create-coupon', authMiddleware, isSeller, createCoupon);
router.get('/get-coupon/:id', auth)

module.exports = router;