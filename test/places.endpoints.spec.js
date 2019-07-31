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
    
    /*context.skip('Given an XSS attack review', () => {
      const maliciousReview = {
        id: 911,
        rating: 5,
        text: 'This text contains an intentionally broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie); alert(''you just got pretend hacked! oh noes!'');">. The image will try to load, when it fails, <strong>it executes malicious JavaScript</strong>',
        place_id: 1,
        user_id: 1
      }

      beforeEach('insert malicious review', () => {
        return db
          .into(places)
          .insert([ maliciousReview ])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/places/${placeId}/reviews/${maliciousReview.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.text).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
          })
        })
    })*/
  })
})