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
// const authRouter = require('./auth/auth-router')
// const reviewsRouter = require('./reviews/reviews-router')
// const imagesRouter = require('./images/images-router')
const PlacesService = require('./places/places-service')
const AuthService = require('./auth/auth-service')
const jsonBodyParser = express.json()

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use('/places', placesRouter)
// app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)
// app.use('/login', authRouter)
// app.use('/images', imagesRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/login', jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body
  const loginUser = { email, password }
  
  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      })

  AuthService.getUserWithEmail(
    req.app.get('db'),
    loginUser.email
  )
    .then(dbUser => {
      if (!dbUser)
      return res.status(400).json({
        error: 'Incorrect email or password',
      })
      return AuthService.comparePasswords(loginUser.password, dbUser.password)
        .then(compareMatch => {
          if (!compareMatch)
            return res.status(400).json({
              error: 'Incorrect email or password'
            })

          const sub = dbUser.email
          const payload = { user_id: dbUser.id }
          res.send({
            authToken: AuthService.createJwt(sub, payload),
          })
        })
    })
    .catch(next)
})

app.use(errorHandler)

module.exports = app