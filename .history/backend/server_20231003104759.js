const app = require('./app')

process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`)
})