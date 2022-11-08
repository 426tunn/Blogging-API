const express = require('express');
const BlogsRouter = require('./routes/blogRoutes')
const authRoute = require('./routes/authRoute')

require('./AuthMW/authenticate') //sign up and sign autheentication middleware

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', authRoute)
app.use('/blog', BlogsRouter)

app.get('/', (req, res) => {
    console.log('WELCOME')
    res.status(200).send({
        message: 'Welcome To 426Tunn Blog!!!!'
    })
});

app.use((err, req, res, next) => {
    // console.log(err);
    res.status(500).json({
        error: err.message
    })
})


module.exports = app
