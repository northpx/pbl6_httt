const express = require("express");
const { createUser, loginUser, getUserById, getAllUser, deleteUser, updateUser, loginAdmin } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/loginadmin', loginAdmin)
router.get('/:id',authMiddleware, getUserById);
router.get('/',authMiddleware,is, getAllUser);
router.delete('/:id',authMiddleware,isAdmin, deleteUser);
router.put('/:id',authMiddleware, updateUser)
module.exports=router;