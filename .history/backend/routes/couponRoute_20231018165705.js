const express = require('express');
const { authMiddleware, isSeller } = require('../middleware/auth');
const router = express.Router()

router.post('/create-coupon', authMiddleware, isSeller, )

module.exports = router;