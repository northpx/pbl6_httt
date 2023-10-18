const express = require("express");
const { authMiddleware, isAdmin, isSeller } = require("../middleware/auth");
const { createShop, loginShop, getAllShop, getShopById, updatePassword } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)
router.put('/update-password', authMiddleware, updatePassword)
router.post('/shop-login',loginShop)
router.get('/:id',authMiddleware, isSeller, getShopById)
router

module.exports = router;