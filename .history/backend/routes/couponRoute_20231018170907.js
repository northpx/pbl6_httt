const express = require('express');
const { authMiddleware, isSeller } = require('../middleware/auth');
const { createCoupon, getAllCouponFromShop, deleteCoupon } = require('../controller/couponController');
const router = express.Router()

router.post('/create-coupon', authMiddleware, isSeller, createCoupon);
router.get('/get-coupon/:id', authMiddleware, isSeller, getAllCouponFromShop)
router.delete('/delete-coupon/:id', authMiddleware, isSeller, deleteCoupon)
router.get('/')

module.exports = router;