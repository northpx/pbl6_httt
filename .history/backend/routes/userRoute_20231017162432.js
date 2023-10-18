const express = require("express");
const { createUser, loginUser, getUserById, getAllUser, deleteUser } = require("../controller/userController");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.get('/', getAllUser);
router.delete('/:id', deleteUser);
router.put
module.exports=router;