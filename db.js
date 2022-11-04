const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = process.env.DB_URL

function connectToDB(dbURL) {
    mongoose.connect(dbURL)
     mongoose.connection.on("connected", ()=> {
        console.log('Mongoose Connected')
     });
     mongoose.connection.on('error', (err)=> {
        console.log('Connection Failed', err)
     })
}

module.exports = {connectToDB};