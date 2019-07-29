const express = require('express')
const path = require('path')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { display_name, email, password } = req.body
    const newUser = { display_name, email, password }
    for (const [key, value] of Object.entries(newUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        })
    
    const passwordError = UsersService.validatePassword(password)
    if (passwordError)
      return res.status(400).json({ error: passwordError })
    // not sure why this isn't working after validatePassword fx created
    if (display_name.length < 3 || display_name.length > 20) {
      return res.status(400).json({
        error: `Display name must be between 3 and 20 characters`
      })
    }
    
    // how to construct this promise for both fields? it's looping.
    UsersService.hasUserWithEmail(
      req.app.get('db'),
      email
    )
      .then(hasUserWithEmail => {
        if (hasUserWithEmail)
          return res.status(400).json({ error: `Email has already been registered` })

          return UsersService.hasUserWithDisplayName(
            req.app.get('db'),
            display_name
          )
            .then(hasUserWithDisplayName => {
              if (hasUserWithDisplayName)
                return res.status(400).json({ error: `Display name has already been taken` })

                  return UsersService.hashPassword(password)
                    .then(hashedPassword => {
                      const newUser = {
                        display_name,
                        email,
                        password: hashedPassword,
                        date_created: 'now()',
                      }
          
                      return UsersService.insertUser(
                        req.app.get('db'),
                        newUser
                      )
                        .then(user => {
                          res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.id}`))
                            .json(UsersService.serializeUser(user))
                        })
        })
      })
    })
      .catch(next)
  })
  
usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    UsersService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: `User not found`
          })
        }
        res.user = user
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(UsersService.serializeUser(res.user))
  })
  
module.exports = usersRouter