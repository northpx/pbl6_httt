const express = require("express");
const { createUser, loginUser, getUserById, getAllUser, deleteUser, updateUser, loginAdmin, updatePassword, getAllShop, deleteShop } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post('/register', createUser);
router.put('/update-password',authMiddleware, updatePassword)
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin)
router.get('/all-shop', authMiddleware, isAdmin, getAllShop)
router.get('/:id',authMiddleware,isAdmin, getUserById);
router.get('/',authMiddleware,isAdmin, getAllUser);
router.delete('/:id',authMiddleware,isAdmin, deleteUser);
router.delete('/:id',authMiddleware,isAdmin, deleteShop);
router.put('/edit-user',authMiddleware, updateUser)

module.exports=router;