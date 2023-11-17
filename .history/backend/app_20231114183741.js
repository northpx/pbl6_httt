const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoute = require("./routes/userRoute");
const shopRoute = require("./routes/shopRoute");
const couponRoute = require("./routes/couponRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const seedRouter = require("./routes/seedRoutes");
const bookRoute = require("./routes/bookRoute");
const insertData = require('./routes/insert')

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.use("/api/v2/user", authRoute);
app.use("/api/v2/shop", shopRoute);
app.use("/api/v2/coupon", couponRoute);
app.use("/api/v2/seed", seedRouter);
app.use("/api/v2/books", bookRoute);
app.use("/api/v2/books", bookRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
