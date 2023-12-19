const express = require('express');
const { authMiddleware, isAdmin, isSeller } = require('../middleware/auth');
const { isAuth } = require('../utils/isAuth');
const {
  createShop,
  loginShop,
  getAllShop,
  getShopById,
  updatePassword,
  updateShop,
  deleteShop,
  getShopsByUserId,
  updatedShop,
} = require('../controller/shopController');
const router = express.Router();

router.get('/userId/:userId', isAuth, getShopsByUserId);
router.post('/shop', createShop);
router.put('/shop', updatedShop);
router.put('/update-password', authMiddleware, updatePassword);
router.post('/shop-login', loginShop);
router.get('/shop/:id', getShopById);
router.put('/edit-shop', authMiddleware, updateShop);
router.delete('/:id', authMiddleware, isAdmin, deleteShop);
module.exports = router;
