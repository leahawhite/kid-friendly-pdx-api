const PlacesService = require('../src/services/places-service')
const knex = require('knex')
const app = require('../src/app')
const testPlaces = require('./test_places')


describe('Places service object', function() {
  let db
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  before(() => db('places').truncate())

  afterEach(() => db('places').truncate())

  after('disconnect from db', () => db.destroy())

  describe('GET /api/places', () => {
    context(`Given 'places' has data`, () => {
      before(() => {
        return db
          .into('places')
          .insert(testPlaces)
      })

      it.only(`getAllPlaces() resolves all places from 'places' table`, () => {
        return PlacesService.getAllPlaces(db)
          .then(actual => {
            expect(actual).to.eql(testPlaces.map(place => ({
              ...place,
              date_added: new Date(place.date_added.toLocaleString('en', { timeZone: 'UTC' }))
            })))
          })
      })
    })
    context(`Given 'places' has no data`, () => {
      it('getAllPlaces() resolves an empty array', () => {
        return PlacesService.getAllPlaces(db)
          .then(actual => {
            expect(actual).to.eql([])
          })
      })
    })
  })

  describe(`GET /api/places/:places_id`, () => {
    context(`Given 'places' has data`, () => {
      beforeEach(() => {
        return db
          .into('places')
          .insert(testPlaces)
      })

      it('getById() responds with the specified place', () => {
        const testId = 1
        const testPlace = testPlaces[testId - 1]
        return PlacesService.getById(db, testId)
          .then(actual => {
            expect (actual).to.eql({
              id: testId,
              name: testPlace.name,
              address1: testPlace.address1,
              address2: testPlace.address2,
              city: testPlace.city,
              state: testPlace.state,
              zipcode: testPlace.zipcode,
              latitude: testPlace.latitude,
              longitude: testPlace.longitude,
              neighborhood: testPlace.neighborhood,
              hours: testPlace.hours,
              phone: testPlace.phone,
              website: testPlace.website,
              date_added: new Date(testPlace.date_added.toLocaleString('en', { timeZone: 'UTC' })),
              category: testPlace.category,
              descriptors: testPlace.descriptors,
              features: testPlace.features,
              images: testPlace.images
            })
          })
      })
    })
  })
})