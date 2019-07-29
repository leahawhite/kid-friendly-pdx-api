const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Reviews Endpoints', function() {
  let db

  const {
    testPlaces,
    testUsers,
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

  describe(`POST /reviews`, () => {
    context('Given no reviews', () => {
      beforeEach(() =>
        db.into('users').insert(testUsers)
      )

      it('responds with 404', () => {

      })
    })
    beforeEach('insert places', () =>
      helpers.seedPlacesTables(
        db,
        testUsers,
        testPlaces,
      )
    )

    it(`responds 401 'Unauthorized request' when no creds`, () => {
      const userNoCreds = { email: "", password: "" }
      return supertest(app)
        .post(`/reviews`)
        .set('Authorization', helpers.makeAuthHeader(userNoCreds))
        .expect(401, { error: `Unauthorized request` })
    })

    it(`responds 401 'Unauthorized request' when invalid user`, () => {
      const userInvalidCreds = { email: 'not', password: 'lool00' }
      return supertest(app)
        .post(`/reviews`)
        .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
        .expect(401, { error: `Unauthorized request` })
    })

    it(`responds 401 'Unauthorized request' when invalid password`, () => {
      const userInvalidPass = { email: testUsers[0].email, password: 'wrong' }
      return supertest(app)
        .post('/reviews')
        .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
        .expect(401, { error: `Unauthorized request` })
    })

    it(`creates a review, responding with 201 and the new review`, function() {
      this.retries(3)
      const testPlace = testPlaces[0]
      const testUser = testUsers[0]
      const newReview = {
        rating: 5,
        text: 'Great!',
        place_id: testPlace.id,
      }
      return supertest(app)
        .post('/reviews')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.text).to.eql(newReview.text)
          expect(res.body.place_id).to.eql(newReview.place_id)
          expect(res.body.user.id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/reviews/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('reviews')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.rating).to.eql(newReview.rating)
              expect(row.text).to.eql(newReview.text)
              expect(row.place_id).to.eql(newReview.place_id)
              expect(row.user_id).to.eql(testUser.id)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['rating', 'text', 'place_id']

    requiredFields.forEach(field => {
      const testPlace = testPlaces[0]
      const testUser = testUsers[0]
      const newReview = {
        rating: 5,
        text: 'Great!',
        place_id: testPlace.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field]

        return supertest(app)
          .post('/reviews')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newReview)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})