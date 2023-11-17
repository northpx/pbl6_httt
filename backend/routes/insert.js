const express = require('express');
const { insertBook } = require('../controller/insertData');
const router = express.Router();


router.post('/insert-book', insertBook)

module.exports = router;