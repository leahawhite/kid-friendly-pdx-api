module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
<<<<<<< HEAD
  DB_URL: process.env.DATABASE_URL || 'postgresql://postgres:quesadilla@localhost/kid_friendly_pdx',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://postgres:quesadilla@localhost/kid_friendly_pdx_test'
=======
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/api',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api'
>>>>>>> 7ce8ecb49347b4907ac870026eb3a46f98d2dde1
}