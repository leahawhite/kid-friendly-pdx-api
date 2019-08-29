const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Images Endpoints', function() {
  let db

  const {
    testUsers, 
    testPlaces, 
    testHours, 
    testCategories, 
    testPlaceCategories, 
    testDescriptors, 
    testPlaceDescriptors,
    testImages,
    testReviews
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
        testHours, 
        testCategories, 
        testPlaceCategories, 
        testDescriptors, 
        testPlaceDescriptors, 
        testImages,
        testReviews
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
      
      return supertest(app)
        .post('/api/images')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newImages)
        .expect(201)
    })

    it(`responds with 400 and an error message when required fields are missing`, () => {
      const testUser = testUsers[0]
      const newImages = [ 
        { "title": "test title 1" } 
      ]
      const errorMsg = 'Missing id,src,place_id in request body'
      return supertest(app)
        .post('/api/images')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newImages)
        .expect(500)
        .expect(res => {
          expect(res.body.error).to.eql(errorMsg)
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