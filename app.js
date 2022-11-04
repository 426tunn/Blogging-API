const app = require('./index');
// const express = require('express')
// const app = express();
const {connectToDB} = require('./db');
require('dotenv').config()

const PORT = 4333;
const dbURL = process.env.DB_URL
connectToDB()

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT: ${PORT}`)
})

