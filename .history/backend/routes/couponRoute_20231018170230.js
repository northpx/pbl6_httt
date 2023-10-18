const express = require('express');
const { authMiddleware, isSeller } = require('../middleware/auth');
const { createCoupon, getAllCouponFromShop } = require('../controller/couponController');
const router = express.Router()

router.post('/create-coupon', authMiddleware, isSeller, createCoupon);
router.get('/get-coupon/:id', authMiddleware, isSeller, getAllCouponFromShop)
router.delete('/delete-coupon/:id')

module.exports = router;