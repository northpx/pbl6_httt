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
    },
    {
      user: createUsers[1]._id,
      name: 'IPM',
      email: 'ipm@gmail.com',
      phone_number: '123456',
      address: 'VN',
    },
  ];
  const createShops = await Shop.insertMany(shops);
  await Book.deleteMany({});
  const createBooks = await Book.insertMany(data.books);
  await ShopBook.deleteMany({});
  const shopBookData = [
    {
      shop: createShops[0]._id, // Assuming shopDocs[0] corresponds to 'Shop1'
      book: createBooks[0]._id, // Assuming bookDocs[0] corresponds to 'Truyen1'
      slug: 'slug1',
      image: '/images/p1.jpg',
      price: 20,
      discount: 0,
      quantity: 10,
      reviews: 0,
      ratings: 0,
      sold: 0,
      expiryDiscount: 0,
    },
    {
      shop: createShops[0]._id, // Assuming shopDocs[0] corresponds to 'Shop1'
      book: createBooks[1]._id, // Assuming bookDocs[0] corresponds to 'Truyen1'
      slug: 'slug2',
      image: '/images/p2.jpg',
      price: 10,
      discount: 0,
      quantity: 16,
      reviews: 0,
      ratings: 0,
      sold: 0,
      expiryDiscount: 0,
    },
    {
      shop: createShops[1]._id, // Assuming shopDocs[0] corresponds to 'Shop1'
      book: createBooks[0]._id, // Assuming bookDocs[0] corresponds to 'Truyen1'
      slug: 'slug3',
      image: '/images/p3.jpg',
      price: 24,
      discount: 0,
      quantity: 13,
      reviews: 0,
      ratings: 0,
      sold: 0,
      expiryDiscount: 0,
    },
    {
      shop: createShops[1]._id, // Assuming shopDocs[0] corresponds to 'Shop1'
      book: createBooks[1]._id, // Assuming bookDocs[0] corresponds to 'Truyen1'
      slug: 'slug4',
      image: '/images/p4.jpg',
      price: 30,
      discount: 0,
      quantity: 40,
      reviews: 0,
      ratings: 0,
      sold: 0,
      expiryDiscount: 0,
    },
    // Add more shopBook data objects here
  ];
  const createShopBooks = await ShopBook.insertMany(shopBookData);
  res.send({ createShops, createBooks, createShopBooks });
});

module.exports = seedRouter;
