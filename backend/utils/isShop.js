const isShop = (req, res, next) => {
  if (req.user && req.user.role === 'shop') {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
module.exports = { isShop };
