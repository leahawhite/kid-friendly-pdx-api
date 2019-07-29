const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Places Endpoints', function() {
  let db

  const {
    testUsers,
    testPlaces,
    testReviews,
  } = helpers.makePlacesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  after('disconnect from db', () => db.destroy())

  describe('GET /places', () => {
    context('Given no places', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/places')
          .expect(200, [])
      })
    })

    context(`Given 'places' has data`, () => {
      const testPlaces = helpers.makePlacesArray()
      beforeEach('insert places', () => {
        helpers.seedPlacesTables(
          db,
          testUsers,
          testPlaces,
          testComments
        )
      })

      it(`responds with 200 and all of the places`, () => {
        const expectedPlaces = testPlaces.map(place =>
          helpers.makeExpectedPlace(
            testUsers,
            place,
            testReviews
          ))
          return supertest(app)
            .get('/places')
            .expect(200, expectedPlaces)
      })
    })
  })
  
  describe('GET /places/:place_id', () => {
    context('Given no places', () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it('responds with 404', () => {
        const placeId = 123456
        return supertest(app)
          .get(`/places/${placeId}`)
          .expect(404, { error: { message: `Place doesn't exist`}})
      })
    })

    context(`Given 'places' has data`, () => {
      beforeEach('insert articles', () =>
        helpers.seedArticlesTables(
          db,
          testUsers,
          testArticles,
          testComments,
        )
      )
      
      it('responds with 200 and the specified place', () => {
        const placeId = 2
        const expectedPlace = helpers.makeExpectedPlace(
          testUsers,
          testPlaces[placeId-1],
          testReviews
        )
        return supertest(app)
          .get(`/places/${placeId}`)
          .expect(200, expectedPlace)
      })
    })
  })

  describe(`GET /places/:place_id/reviews`, () => {
    context(`Given no reviews`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const placeId = 123456
        return supertest(app)
          .get(`/places/${placeId}/reviews`)
          .expect(404, { error: `Review not found` })
      })
    })

    context('Given there are reviews for place in the database', () => {
      beforeEach('insert places', () =>
        helpers.seedPlacesTables(
          db,
          testUsers,
          testPlaces,
          testReviews,
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const placeId = 1
        const expectedReviews = helpers.makeExpectedPlaceReviews(
          testUsers, placeId, testReviews
        )

        return supertest(app)
          .get(`/places/${placeId}/reviews`)
          .expect(200, expectedReviews)
      })
    })
  })
})