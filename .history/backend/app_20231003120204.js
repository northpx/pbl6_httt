const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cookieParser())


if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/.env"
    })
}

app.use(ErrorHandler)

module.exports = app;