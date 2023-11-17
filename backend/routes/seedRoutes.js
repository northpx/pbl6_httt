const express = require('express');
const ShopBook = require('../model/ShopBook');
const Book = require('../model/Book');
const Shop = require('../model/Shop');
const data = require('../data');
const User = require('../model/User');

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await User.deleteMany({});
  const createUsers = await User.insertMany(data.users);
  await Shop.deleteMany({});
  const shops = [
    {
      user: createUsers[0]._id,
      name: 'Shop',
      email: 'shop1@gmail.com',
      phone_number: '123456',
      address: 'VN',
      zipCode: 123456,
      description: 'Shop',
      phoneNumber: '123456',
    },
    {
      user: createUsers[1]._id,
      name: 'IPM',
      email: 'ipm@gmail.com',
      phone_number: '123456',
      address: 'VN',
      zipCode: 123456,
      description: 'Shop',
      phoneNumber: '123456',
    },
  ];
  const createBooks = await Book.find();
  const createShops = await Shop.insertMany(shops);
  await ShopBook.deleteMany({});
  const shopBookData = [];
  createShops.forEach((shop) => {
    createBooks.forEach((book) => {
      shopBookData.push({
        shop: shop._id,
        book: book._id,
        slug: `slug_${shop.name}_${book.title}`, // Adjust the slug creation as needed
        image: `${book.image}`, // Assuming imageLink is the field in the book data
        price: 20 /* Set the price based on your logic */,
        discount: 0 /* Set the discount based on your logic */,
        quantity: 100 /* Set the quantity based on your logic */,
        reviews: 0,
        ratings: 0,
        sold: 0,
        expiryDiscount: 0,
      });
    });
  });
  const createShopBooks = await ShopBook.insertMany(shopBookData);
  res.send({ createShops, createShopBooks });
});

module.exports = seedRouter;
