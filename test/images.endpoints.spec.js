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

  describe('POST /api/images', () => {
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
          "place_id": testPlace.id
        },
        {
          "id": "23456",
          "src": "http test 2",
          "title": "test title 2",
          "place_id": testPlace.id
        },
      ]
      const newImage = newImages[0]

      return supertest(app)
        .post('/api/images')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newImages)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(newImage.id)
          expect(res.body.src).to.eql(newImage.src)
          expect(res.body.place_id).to.eql(newImage.place_id)
          expect(res.body.user_id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/api/images/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
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
              expect(row.place_id).to.eql(newImage.place_id)
              expect(row.user_id).to.eql(testUser.id)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['id', 'src', 'place_id']

    requiredFields.forEach(field => {
      const testPlace = testPlaces[0]
      const testUser = testUsers[0]
      const newImages = [
        {
          "id": "12345",
          "src": "http test 1",
          "title": "test title 1",
          "place_id": testPlace.id
        },
        {
          "id": "23456",
          "src": "http test 2",
          "title": "test title 2",
          "place_id": testPlace.id
        },
      ]
      const newImage = newImages[0]

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newImage[field]

        return supertest(app)
          .post('/api/images')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newImages)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })

  describe('POST /images/upload', () => {
    beforeEach('insert tables', () =>
        helpers.seedUsers(
          db,
          testUsers
        )
      )
    
    it(`uploads an array of 1-3 image files, responding with 201 and the new images`, () => {
      const testUser = testUsers[0]
      return supertest(app)
      .post('/api/images/upload')
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .set('Accept', 'application/form-data')
      .attach('file', './test/images/test1.jpg')
      .attach('file', './test/images/test2.jpg')
      .attach('file', './test/images/test3.jpg')
      .expect(201)
      .expect(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(3)
        const image = res.body[0];
        expect(image).to.include.all.keys('id', 'src');
      })
    })
    it('responds with 500 and an error message if uploaded file is not an allowed format', () => {
      const testUser = testUsers[0]
      const formatError = 
        {
          "message": "An unknown file format not allowed",
          "http_code": 400,
          "storageErrors": []
        }
      return supertest(app)
      .post('/api/images/upload')
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .set('Accept', 'application/form-data')
      .attach('file', './test/unallowedFormat.txt')
      .expect(500)
      .expect(res => {
        expect(res.body).to.eql(formatError)
      })
    })
  })
})