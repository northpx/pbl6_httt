const express = require('express');
const {
  createUser,
  loginUser,
  getUserById,
  getAllUser,
  deleteUser,
  updateUser,
  loginAdmin,
  updatePassword,
  getAllShop,
  deleteShop,
  getCartItems,
  updateCart,
  deleteCartItem,
} = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/register', createUser);
router.put('/update-password', authMiddleware, updatePassword);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.get('/all-shop', authMiddleware, isAdmin, getAllShop);
router.get('/:id', authMiddleware, isAdmin, getUserById);
router.get('/', authMiddleware, isAdmin, getAllUser);
router.get('/:userId/cart-items', getCartItems);
router.delete('/:id', authMiddleware, isAdmin, deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.post('/update-cart', updateCart);
router.post('/cart/:id', deleteCartItem);

module.exports = router;
