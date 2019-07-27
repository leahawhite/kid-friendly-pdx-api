const app = require('./app')
const knex = require('knex')
const PlacesService = require('./services/places-service')
const { PORT, DB_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: 'postgresql://postgres:quesadilla@localhost/kid_friendly_pdx'
})



// console.log(PlacesService.getAllPlaces())

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})