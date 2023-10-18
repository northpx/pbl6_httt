const express = require("express");
const { authMiddleware, isAdmin, isSeller } = require("../middleware/auth");
const { createShop, loginShop, getAllShop } = require("../controller/shopController");
const router = express.Router();

router.post('/register', createShop)
router.post('/login',loginShop)
router.get('/', authMiddleware, isAdmin, getAllShop)
router.get('/:id',authMiddleware, isSeller, get )

module.exports = router;