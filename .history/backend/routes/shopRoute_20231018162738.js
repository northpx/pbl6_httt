const express = require("express");
const { authMiddleware, isAdmin, isSeller } = require("../middleware/auth");
const { createShop, loginShop, getAllShop, getShopById, updatePassword, updateShop } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)
router.put('/update-password', authMiddleware, updatePassword)
router.post('/shop-login',loginShop)
router.get('/:id',authMiddleware, isSeller, getShopById)
router.put('/edit-shop', authMiddleware, updateShop)

module.exports = router;