const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoute = require('./routes/userRoute');
const shopRoute = require('./routes/shopRoute');
const orderRoute = require('./routes/orderRoute');
const couponRoute = require('./routes/couponRoute');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const seedRouter = require('./routes/seedRoutes');
const bookRoute = require('./routes/bookRoute');
const insertRoute = require('./routes/insert');
const paypal = require('paypal-rest-sdk');
const path = require('path');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

paypal.configure({
  model: 'sandbox',
  client_id:
    'Ab-v0l-EPDTxixzUUpR5y6pmJEeOkgrMUWKX_1VoZXx6wBM9WwTyYiCteZoTPZdaiHyIYEj53pvO5r7O',
  client_secret:
    'EOkVJzZCRCipMKgesuFwHUSCuYtXIa6iRg0shkbFTvXDw4-Wt7swQlIW8_d4sUwj26yCWT_mAWhJQr8G',
});

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});
app.get('/paypal', (req, res) => {
  var create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://192.168.1.9:5000/success',
      cancel_url: 'http://192.168.1.9:5000/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'item',
              sku: 'item',
              price: '1.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: '1.00',
        },
        description: 'This is the payment description.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log('Create Payment Response');
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

app.get('/success', (req, res) => {
  // res.send("Success");
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '1.00',
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log('Get Payment Response');
        console.log(JSON.stringify(payment));
        res.render(path.join(__dirname, 'views', 'success.ejs'));
      }
    }
  );
});

app.get('/cancel', (req, res) => {
  res.render(path.join(__dirname, 'views', 'cancel.ejs'));
});

app.use('/api/v2/user', authRoute);
app.use('/api/v2/shop', shopRoute);
app.use('/api/v2/coupon', couponRoute);
app.use('/api/v2/seed', seedRouter);
app.use('/api/v2/books', bookRoute);
app.use('/api/v2/orders', orderRoute);
app.use('/api/v2/insert', insertRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
