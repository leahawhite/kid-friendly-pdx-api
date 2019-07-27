const express = require('express')

const authRouter = express.Router()
const jsonBodyParser = express.json()

.post('/login', jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body
  const loginUser = { email, password }
  const bearerToken = req.headers.getBearerToken()

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
  db.findUser({
    email: bearerToken.email,
    password: bearerToken.password
  }).then(user => {
    if (user not found) {
      return rejectTheRequest()
    } else {
      db.insert
    }
  })
})

module.exports = authRouter
