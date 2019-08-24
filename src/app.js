require('dotenv').config()
const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
// const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
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
app.use(cors())
app.use(helmet())

app.use('/api/places', placesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)
app.use('/api/images', imagesRouter)

app.use(errorHandler)

module.exports = app