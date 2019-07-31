const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const { requireAuth } = require('../middleware/jwt-auth')

const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

reviewsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ReviewsService.getAllReviews(knexInstance)
      .then(reviews => {
        res.json(reviews.map(ReviewsService.serializeReview))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { place_id, rating, text } = req.body
    const newReview = { place_id, rating, text }
    
    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newReview.user_id = req.user.id
    
    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review))
      })
      .catch(next)
  })

module.exports = reviewsRouter