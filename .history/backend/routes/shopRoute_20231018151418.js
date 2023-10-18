const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const { createShop } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)

module.exports = router;