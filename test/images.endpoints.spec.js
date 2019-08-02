const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Images Endpoints', function() {
  let db

  const {
    testPlaces,
    testUsers,
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

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/images`, () => {
    context('Given no images', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/images')
          .expect(200, [])
      })
    })

    context('Given there are images in the database', () => {
      beforeEach('insert images', () =>
        helpers.seedPlacesTables(
          db,
          testUsers,
          testPlaces,
          testReviews,
          testImages
        )
      )
        
      it('responds with 200 and all of the images', () => {
        return supertest(app)
        .get('/api/images')
        .expect(200, testImages)
      })
    })
  })

  // test for both post endpoints, then validation 
  describe('POST /images', () => {
    beforeEach('insert tables', () =>
        helpers.seedPlacesTables(
          db,
          testUsers,
          testPlaces,
          testReviews,
          testImages
        )
      )
    
    it(`creates image(s) from an array of 1-3 images, responding with 201 and the new image(s)`, () => {
      this.retries(3)
      const testPlace = testPlaces[0]
      const testUser = testUsers[0]
      const newImages = [
        {
          "id": "12345",
          "src": "http test 1",
          "title": "test title 1",
          "place_id": testPlace.id,
        },
        {
          "id": "123456",
          "src": "http test 2",
          "title": "test title 2",
          "place_id": testPlace.id,
        }
      ]
      return supertest(app)
        .post('/api/images')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newImages)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(newImage.id)
          console.log(res.body)
          expect(res.body.src).to.eql(newImage.src)
          expect(res.body.title).to.eql(newImage.title)
          expect(res.body.place_id).to.eql(newImage.place_id)
          expect(res.body.user_id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/api/images/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_added).toLocaleString()
          // expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('images')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.id).to.eql(newImage.id)
              expect(row.src).to.eql(newImage.src)
              expect(row.title).to.eql(newImage.title)
              expect(row.place_id).to.eql(newImage.place_id)
              expect(row.user_id).to.eql(testUser.id)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_added).toLocaleString()
              // expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['id', 'src', 'place_id']

    requiredFields.forEach(field => {
      const testPlace = testPlaces[0]
      const testImage = testImages[0]
      const testUser = testUsers[0]
      const newImage = {
        "id": testImage.id,
        "src": testImage.src,
        "title": testImage.title,
        "place_id": testPlace.id
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newImage[field]

        return supertest(app)
          .post('/api/images')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newImage)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})