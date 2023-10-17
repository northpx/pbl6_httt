const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express()

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/.env"
    })
}

app.use(ErrorHandler)

module.exports = app;