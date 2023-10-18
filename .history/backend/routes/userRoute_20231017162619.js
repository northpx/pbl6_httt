const express = require("express");
const { createUser, loginUser, getUserById, getAllUser, deleteUser, updateUser } = require("../controller/userController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post()
router.get('/:id',authMiddleware, getUserById);
router.get('/',authMiddleware, getAllUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser)
module.exports=router;