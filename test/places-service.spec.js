const PlacesService = require('../src/services/places-service')
// const helpers = require('./test-helpers')
const testPlaces = require('./test_places')

const knex = require('knex')

describe.only('Places service object', function() {
  let db
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => {
    return db
      .into('places')
      .insert(testPlaces)
  })

  describe('getAllPlaces()', () => {
    it(`resolves all places from 'places' table`, () => {
      // test
    })
  })
})