const app = require('./index');
const {connectToDB} = require('./db');
require('dotenv').config()

const PORT = 4333;
const dbURL = process.env.DB_URL
connectToDB(dbURL)

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT: ${PORT}`)
})

