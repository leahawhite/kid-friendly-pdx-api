const xss = require('xss')
const bcrypt = require('bcryptjs')

const UsersService = {
  hasUserWithDisplayName(db, display_name) {
    return db('users')
      .where({ display_name })
      .first()
      .then(user => !!user)
  },
  hasUserWithEmail(db, email) {
    return db('users')
      .where({ email })
      .first()
      .then(user => !!user)
  },
  validatePassword(password) {
    if (password.length < 6) {
      return 'Password must be between 6 and 36 characters'
    }
    if (password.length > 36) {
      return 'Password must be between 6 and 36 characters'
    }
    if (!password.match(/.*[0-9].*/)) {
      return 'Password must contain at least one digit'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
  serializeUser(user) {
    return {
      id: user.id,
      display_name: xss(user.display_name),
      email: xss(user.email),
      date_created: new Date(user.date_created),
    }
  },
  getById(db, id) {
    return db
      .from('users')
      .select('*')
      .where('id', id)
      .first()
  }
}

module.exports = UsersService
