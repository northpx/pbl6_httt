const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoute = require('./routes/userRoute');
const bookRoute = require('./routes/bookRoute');
const seedRouter = require('./routes/seedRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

app.use('/api/v2/user', authRoute);
app.use('/api/v2/books', bookRoute);
app.use('/api/v2/seed', seedRouter);

app.use(ErrorHandler.handle);

module.exports = app;
