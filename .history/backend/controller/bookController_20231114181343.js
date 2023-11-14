const Book = require('../model/Book');
const Shop = require('../model/Shop');
const ShopBook = require('../model/ShopBook');
const asyncHandler = require('express-async-handler');

const createBook = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const findBook = await User.findOne({ title:  title});
  if (!findBook) {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } else {
    throw new Error('Book Already Exists!');
  }
});

const getAllBooks = async (req, res) => {
  const books = await ShopBook.find().populate('shop').populate('book');
  res.send(books);
};

const getBook = async (req, res) => {
  try {
    const { slug } = req.params;
    const book = await ShopBook.findOne({ slug })
      .populate('shop')
      .populate('book');

    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.send(book);
  } catch (error) {
    console.error('Error in getBook:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getBookDiscounted = async (req, res) => {
  try {
    const books = await ShopBook.find({ discount: { $gt: 0 } })
      .sort({
        discount: -1,
      })
      .populate('book')
      .populate('shop'); // Sort by discount in descending order
    res.send(books);
  } catch (error) {
    console.error('Error fetching products with discount:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBookSold = async (req, res) => {
  try {
    const books = await ShopBook.find({ sold: { $gt: 0 } })
      .sort({
        sold: -1,
      })
      .populate('book')
      .populate('shop'); // Sort by discount in descending order
    res.send(books);
  } catch (error) {
    console.error('Error fetching products with discount:', error);
    res.status(500).send('Internal Server Error');
  }
};

const searchBooks = asyncHandler(async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || 3;
  const page = query.page || 1;
  const category = query.category || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const order = query.order || '';
  const author = query.author || '';
  const shop = query.shop || '';
  const searchQuery = query.query || '';

  const queryC = {};

  if (author !== '') {
    queryC.author = author;
  }

  if (category !== '') {
    queryC.categories = category;
  }

  const tempBooks = await Book.find(queryC);
  const tempShops = await Shop.find({ name: shop });

  const bookFilter =
    tempBooks.length > 0
      ? { book: { $in: tempBooks.map((book) => book._id) } }
      : {};
  const shopFilter =
    tempShops.length > 0
      ? { shop: { $in: tempShops.map((shop) => shop._id) } }
      : {};

  const queryFilter =
    searchQuery && searchQuery !== 'all' // searchQuery tồn tại và khác 'all'
      ? {
          name: {
            $regex: searchQuery, // so sánh tên sản phẩm với searchQuery
            $options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường
          },
        }
      : {};

  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating), // lọc các sản phẩm có xếp hạng lớn hơn hoặc bằng giá trị của biến rating
          },
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          // 1-50
          price: {
            // lọc các sản phẩm có giá nằm trong khoảng min-max
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const books = await ShopBook.find({
    ...bookFilter,
    ...shopFilter,
    ...queryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate('shop')
    .populate('book');

  const countBooks = await ShopBook.countDocuments({
    ...queryFilter,
    ...priceFilter,
    ...ratingFilter,
    ...bookFilter,
    ...shopFilter,
  });

  res.send({
    books,
    countBooks,
    page,
    pages: Math.ceil(countBooks / pageSize),
  });
});

const getBookByShopId = async (req, res) => {
  const { shopId } = req.params;
  const books = await ShopBook.find({ shop: shopId }).populate('book');
  if (books) res.send(books);
  else res.send({ message: 'Product not found!' });
};

const deleteBook = asyncHandler(async (req, res) => {
  const book = await ShopBook.findById(req.params.id);
  if (book) {
    await book.deleteOne();
    res.send({ message: 'Book Deleted' });
  } else {
    res.status(404).send({ message: 'Book Not Found' });
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const shopBookId = req.params.id;
  const shopBook = await ShopBook.findById(shopBookId);
  if (shopBook) {
    shopBook.slug = req.body.slug;
    shopBook.price = req.body.price;
    shopBook.image = req.body.image;
    shopBook.discount = req.body.discount;
    shopBook.quantity = req.body.quantity;
    shopBook.expiryDiscount = req.body.expiryDiscount;
    await shopBook.save();
    res.send({ message: 'Product Updated' });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Book.find().distinct('category');
    res.send(categories);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = {
  getAllBooks,
  getBook,
  searchBooks,
  getBookByShopId,
  deleteBook,
  updateBook,
  getCategories,
  getBookDiscounted,
  getBookSold,
};
