const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const CartItem = require('../model/CartItem');
const { generateRefreshToken } = require('../utils/refreshToken');
const { generateToken } = require('../utils/jwtToken');
const validateMongodbId = require('../utils/validateMongoDbId');
const Shop = require('../model/Shop');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    const data = {
      _id: newUser?._id,
      name: newUser?.name,
      email: newUser?.email,
      token: generateToken(newUser?._id),
    };
    res.json(data);
  } else {
    res.status(401).json({ message: 'User Already Exists!' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email }).select('+password');
  if (findUser && (await findUser.comparePassword(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findAdmin = await User.findOne({ email }).select('+password');
  if (findAdmin.role !== 'admin') throw new Error('Not authorised');
  if (findAdmin && (await findAdmin.comparePassword(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      name: findAdmin?.name,
      email: findAdmin?.email,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error('Invalid Credentials');
  }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error('No refresh token in cookie');
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error('No refresh token presen in db or not matched');
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error('There is something wrong with refresh token');
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getuser = await User.findById(id);
    res.json({
      getuser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllShop = asyncHandler(async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req.body?.name,
        email: req.body?.email,
        phoneNumber: req.body?.phoneNumber,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deluser = await User.findByIdAndDelete(id);
    res.json({
      deluser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});

const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await CartItem.find({ user: userId }).populate({
      path: 'book',
      populate: [
        {
          path: 'shop',
          model: 'Shop',
        },
        {
          path: 'book',
          model: 'Book', // Thay 'Book' bằng tên của model "Book" hoặc model tương ứng
        },
      ],
    });

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const updateCart = asyncHandler(async (req, res) => {
  try {
    const { cartItems: newCartItems } = req.body;

    // Kiểm tra và xử lý dữ liệu nhận được từ client
    if (!Array.isArray(newCartItems)) {
      throw new Error('Invalid data format');
    }

    for (const item of newCartItems) {
      await CartItem.deleteMany({ book: item.book, user: item.user });
      delete item._id;
    }
    await CartItem.insertMany(newCartItems);

    const userId = newCartItems[0].user;
    const cartItems = await CartItem.find({ user: userId }).populate({
      path: 'book',
      populate: [
        {
          path: 'shop',
          model: 'Shop',
        },
        {
          path: 'book',
          model: 'Book', // Thay 'Book' bằng tên của model "Book" hoặc model tương ứng
        },
      ],
    });

    res.send(cartItems);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: 'Bad Request' });
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let item = await CartItem.findById(id);

    if (item) {
      await CartItem.deleteOne({ _id: id });
      res.send({ message: 'Cart Item deleted successfully!' });
    } else {
      res.status(404).send({ message: 'Cart Item not found!' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = {
  createUser,
  loginUser,
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
  loginAdmin,
  handleRefreshToken,
  updatePassword,
  getAllShop,
  getCartItems,
  updateCart,
  deleteCartItem,
};
