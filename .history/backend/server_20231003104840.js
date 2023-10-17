const app = require('./app')

process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server for handling uncau')
})