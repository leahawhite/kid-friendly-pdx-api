const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const { requireAuth } = require('../middleware/basic-auth')

const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

const serializeReview = review => ({
  id: review.id,
  text: xss(review.text),
  date_created: review.date_created,
  place_id: review.place_id,
  author: review.author
})

reviewsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ReviewsService.getAllReviews(knexInstance)
      .then(reviews => {
        res.json(reviews.map(serializeReview))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { place_id, rating, text } = req.body
    const newReview = { place_id, rating, text }
    if (!rating)
      return res.status(400).json({
        error: `Star rating is required`
      })
    if (!text)
      return res.status(400).json({
        error: `Text review is required`
      })

    newReview.author = req.user.id
    newReview.date_created = date_created

    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(serializeReview(review))
      })
      .catch(next)
  })

reviewsRouter
  .route('/:review_id')
  .all((req, res, next) => {
    ReviewsService.getById(
      req.app.get('db'),
      req.params.review_id
    )
      .then(review => {
        if(!review) {
          return res.status(404).json({
            error: { message: `Review not found`}
          })
        }
        res.review = review
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeReview(res.review))
  })

module.exports = reviewsRouter