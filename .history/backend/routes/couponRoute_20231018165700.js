const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router()

router.post('/create-coupon', authMiddleware, is)

module.exports = router;