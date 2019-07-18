require('dotenv').config()
const app = require('./app')
const knex = require('knex')
const PlacesService = require('./services/places-service')
const { PORT, DB_URL } = require('./config')

const knexInstance = knex({
  client: 'pg',
  connection: DB_URL
})

console.log(PlacesService.getAllPlaces())

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
