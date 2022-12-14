const express = require('express');
const BlogsRouter = require('./routes/blogRoutes')
const authRoute = require('./routes/authRoute')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const logger = require('./logging/logger');

require('./AuthMW/authenticate') //sign up and sign autheentication middleware

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', authRoute)
app.use('/blog', BlogsRouter)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


//Security Middleware
app.use(helmet())

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.get('/', (req, res) => {
    logger.info('WELCOME')
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
