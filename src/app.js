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

app.use('/places', placesRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)
app.use('/login', authRouter)
app.use('/images', imagesRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app