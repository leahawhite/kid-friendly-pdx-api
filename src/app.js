const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
<<<<<<< HEAD
const { CLIENT_ORIGIN, NODE_ENV } = require('./config')
const helmet = require('helmet')
=======
const { CLIENT_ORIGIN } = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const placesRouter = require('./places/places-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const reviewsRouter = require('./reviews/reviews-router')
const imagesRouter = require('./images/images-router')
>>>>>>> 7ce8ecb49347b4907ac870026eb3a46f98d2dde1

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({ CLIENT_ORIGIN }))
app.use(helmet())

<<<<<<< HEAD
app.use(function errorHandler(error, req, res, next) {
  let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })
  
=======
app.use('/api/places', placesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)
app.use('/api/images', imagesRouter)

app.use(errorHandler)

>>>>>>> 7ce8ecb49347b4907ac870026eb3a46f98d2dde1
module.exports = app