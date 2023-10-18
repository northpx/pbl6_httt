const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', get)
module.exports=router;