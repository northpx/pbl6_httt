const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const { createShop, loginShop } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)
router.post('/login',loginShop)
router.

module.exports = router;