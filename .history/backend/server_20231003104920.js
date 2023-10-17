const app = require('./app')

process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server for handling uncaught exception')
})

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/.env"
    })
}

const server = app.l