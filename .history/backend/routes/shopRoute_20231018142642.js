const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const router = express.Router();



module.exports = router;