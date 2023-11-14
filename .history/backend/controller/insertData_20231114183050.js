const Book = require('../model/Book')
const asyncHandler = require('express-async-handler');
const data = require('../db/output.json')

const fn = async(book)