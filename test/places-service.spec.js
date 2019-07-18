const PlacesService = require('../src/services/places-service')
const knex = require('knex')

describe.only('Places service object', function() {
  let db
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  describe('getAllPlaces()', () => {
    it(`resolves all places from 'places' table`, () => {
      // test
    })
  })
})