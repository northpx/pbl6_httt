const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
rou
module.exports=router;