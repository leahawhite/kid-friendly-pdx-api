const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN, NODE_ENV } = require('./config')
const helmet = require('helmet')

const placesRouter = require('./places/places-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const reviewsRouter = require('./reviews/reviews-router')
const imagesRouter = require('./images/images-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({origin: CLIENT_ORIGIN}))
app.use(helmet())

app.use('/api/places', placesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)
app.use('/api/images', imagesRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})
  
module.exports = app