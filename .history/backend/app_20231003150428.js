const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authRoute = require('')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))


if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/.env"
    })
}

app.use("/api/v2/user", )

app.use(ErrorHandler)

module.exports = app;