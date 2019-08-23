const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Places Endpoints', () => {
  let db

  const {
    testUsers, 
    testPlaces, 
    testHours, 
    testCategories, 
    testPlaceCategories, 
    testDescriptors, 
    testPlaceDescriptors,
    testReviews, 
    testImages
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

  describe('GET /api/places', () => {
    context('Given no places', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/places')
          .expect(200, [])
      })
    })

    context(`Given 'places' has data`, () => {
      const testPlaces = helpers.makePlacesArray()
      
      beforeEach('seed tables', () => {
        helpers.seedPlacesTables(
          db,
          testUsers, 
          testPlaces, 
          testHours, 
          testCategories, 
          testPlaceCategories, 
          testDescriptors, 
          testPlaceDescriptors, 
          testImages,
          testReviews
        )
      })
      
      // need to do a test with no query params and one with, .query({ searchTerm: 'pizza', category: 'restaurant', neighborhood: 'SE' })
      it(`responds with 200 and all of the places`, () => {
        const expectedPlaces = testPlaces.map(place =>
          helpers.makeExpectedPlace(
            testUsers, 
            place, 
            testHours, 
            testCategories, 
            testPlaceCategories, 
            testDescriptors, 
            testPlaceDescriptors, 
            testImages,
            testReviews
          ))
          return supertest(app)
            .get('/api/places')
            .expect(200, expectedPlaces)
      })
    })
  })
  
  describe('GET /api/places/:place_id', () => {
    context('Given no places', () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it('responds with 404', () => {
        const placeId = 123456
        return supertest(app)
          .get(`/api/places/${placeId}`)
          .expect(404, { error: `Place not found`})
      })
    })

    context.only(`Given 'places' has data`, () => {
      beforeEach('insert places', () =>
        helpers.seedPlacesTables(
          db,
          testUsers, 
          testPlaces, 
          testHours, 
          testCategories, 
          testPlaceCategories, 
          testDescriptors, 
          testPlaceDescriptors, 
          testImages,
          testReviews
        )
      )
      
      it('responds with 200 and the specified place', () => {
        const placeId = 2
        const expectedPlace = helpers.makeExpectedPlace(
          testUsers, 
          testPlaces[placeId-1], 
          testHours, 
          testCategories, 
          testPlaceCategories, 
          testDescriptors, 
          testPlaceDescriptors, 
          testImages,
          testReviews
        )
        return supertest(app)
          .get(`/api/places/${placeId}`)
          .expect(200, expectedPlace)
      })
    })
  })

  describe(`GET /api/places/:place_id/reviews`, () => {
    context(`Given no places`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const placeId = 123456
        return supertest(app)
          .get(`/api/places/${placeId}/reviews`)
          .expect(404, { error: `Place not found` })
      })
    })

    context('Given there are reviews for place in the database', () => {
      beforeEach('insert places', () =>
        helpers.seedPlacesTables(
          db,
          testUsers, 
          testPlaces, 
          testHours, 
          testCategories, 
          testPlaceCategories, 
          testDescriptors, 
          testPlaceDescriptors, 
          testImages,
          testReviews
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const placeId = 1
        const expectedReviews = helpers.makeExpectedPlaceReviews(
          testUsers, placeId, testReviews, testImages 
        )

        return supertest(app)
          .get(`/api/places/${placeId}/reviews`)
          .expect(200, expectedReviews)
      })
    })
    
    /*context('Given an XSS attack review', () => {
      const maliciousReview = {
        id: 911,
        rating: 5,
        text: 'Broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">.',
        place_id: 1,
        user_id: 1
      }

      beforeEach('insert malicious review', () => {
        return db
          .into(reviews)
          .insert([ maliciousReview ])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/places/${placeId}/reviews/${maliciousReview.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.text).to.eql(`Broken image <img src="https://url.to.file.which/does-not.exist">.`)
          })
        })
    })*/
  })
})