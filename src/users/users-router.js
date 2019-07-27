const express = require('express')
const uuid = require('uuid/v4')
const users = require('../users.js')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(user => user.id == userId)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.json(user)
  })
  .post('/users', jsonBodyParser, (req, res, next) => {
    const { display_name, email, password } = req.body
    const signupUser = { display_name, email, password }
    for (const [key, value] of Object.entries(signupUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    if (display_name.length < 3 || display_name.length > 20) {
      return res.status(400).json({
        error: `Display name must be between 3 and 20 characters`
      })
    }
    if (password.length < 6 || password.length > 36) {
      return res.status(400).json({
        error: `Password must be between 6 and 36 characters`
      })
    }
    if (!password.match(/.*[0-9].*/)) {
      return res.status(400).json({
        error: `Password must contain at least one digit`
      })
    }
    if (users.find(user => user.display_name == display_name)) {
      return res.status(400).json({ error: `Username already taken` })
    }
    if (users.find(user => user.email == email)) {
      return res.status(400).json({ error: `An account has already been registered with that email`})
    }
    const id = uuid()
    const newUser = {
      id,
      display_name,
      email,
      password
    }
    users.push(newUser)
    res
    .status(201)
    .location(`http://localhost:8000/users/${id}`)
    .json(newUser)
  })

module.exports = usersRouter