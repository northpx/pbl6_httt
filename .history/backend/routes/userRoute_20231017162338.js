const express = require("express");
const { createUser, loginUser, getUserById } = require("../controller/userController");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', getUserById)
module.exports=router;