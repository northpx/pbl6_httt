const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express()
const cookie-

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/.env"
    })
}

app.use(ErrorHandler)

module.exports = app;