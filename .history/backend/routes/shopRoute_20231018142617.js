const express = require("express");
const { createUser, loginUser, getUserById, getAllUser, deleteUser, updateUser, loginAdmin } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const router = express.Router();