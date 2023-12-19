const asyncHandler = require('express-async-handler');
const Shop = require('../model/Shop');
const User = require('../model/User');
const { generateRefreshToken } = require('../utils/refreshToken');
const { generateToken } = require('../utils/jwtToken');
const validateMongodbId = require('../utils/validateMongoDbId');

const createShop = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findShop = await Shop.findOne({ email });
  if (!findShop) {
    const newShop = await Shop.create(req.body);
    await newShop.save();
    res.json(newShop);
  } else {
    res.status(400).json({ message: 'Shop already exists!' });
  }
});

const loginShop = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findShop = await Shop.findOne({ email }).select('+password');
  if (findShop.role !== 'seller') throw new Error('Not authorised!');
  if (findShop && (await findShop.comparePassword(password))) {
    const refreshToken = await generateRefreshToken(findShop?._id);
    const updateshop = await Shop.findByIdAndUpdate(
      findShop.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findShop?._id,
      name: findShop?.name,
      email: findShop?.email,
      address: findShop?.address,
      phoneNumber: findShop?.phoneNumber,
      zipCode: findShop?.zipCode,
      token: generateToken(findShop?._id),
    });
  } else {
    throw new Error('Invalid Credentials');
  }
});

const getShopById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const shop = await Shop.findById(id);
    res.json(shop);
  } catch (error) {
    throw new Error(error);
  }
});

const updateShop = asyncHandler(async (req, res) => {
  const { _id } = req.seller;
  validateMongodbId(_id);
  try {
    const updatedshop = await Shop.findByIdAndUpdate(
      _id,
      {
        name: req.body?.name,
        email: req.body?.email,
        address: req.body?.address,
        phoneNumber: req.body?.phoneNumber,
        zipCode: req.body?.zipCode,
      },
      { new: true }
    );
    res.json(updatedshop);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedShop = asyncHandler(async (req, res) => {
  const { _id, email } = req.body;
  const shop = await Shop.findById(_id);
  if (email != shop.email) {
    const temp = await Shop.findOne({ email: email });
    if (temp) {
      return res.status(404).send({ message: 'Email already exists!' });
    }
  }

  // Creating an update object
  const updateData = { ...req.body };

  try {
    const updatedshop = await Shop.findByIdAndUpdate(
      _id,
      updateData, // Update data
      { new: true } // Return the updated document
    );

    if (!updatedshop) {
      return res.status(404).send({ message: 'Shop not found!' });
    }

    res.send(updatedshop);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const deleteShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const delshop = await Shop.findByIdAndDelete(id);
    res.json({
      delshop,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.seller;
  const { password } = req.body;
  validateMongodbId(_id);
  const shop = await Shop.findById(_id);
  if (password) {
    shop.password = password;
    const updatedPassword = await shop.save();
    res.json(updatedPassword);
  } else {
    res.json(shop);
  }
});

const getShopsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  await User.updateOne({ _id: userId }, { $set: { role: 'shop' } });
  const shops = await Shop.find({ user: userId });

  res.status(201).send(shops);
});

module.exports = {
  createShop,
  loginShop,
  updatePassword,
  getShopById,
  updateShop,
  deleteShop,
  getShopsByUserId,
  updatedShop,
};
