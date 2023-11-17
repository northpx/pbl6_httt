const Book = require('../model/Book')
const asyncHandler = require('express-async-handler');
const data = require('../db/output.json')

const fn = async(book) => {
    await Book.create({
        title: book?.title,
        image: book?.image,
        categories: book?.categories,
        description: book?.description,
        author: book?.author,
        publisher
    })
}