const express = require("express");
const { authMiddleware, isAdmin, isSeller } = require("../middleware/auth");
const { createShop, loginShop, getAllShop, getShopById, updatePassword } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)
router.put('/update-password', authMiddleware, updatePassword)
router.post('/login',loginShop)
router.get('/', authMiddleware, isAdmin, getAllShop)
router.get('/:id',authMiddleware, isSeller, getShopById)

module.exports = router;