const express = require('express')
const uuid = require('uuid/v4')
const reviews = require('../reviews.js');
// const path = require('path')
// const ReviewsService = require('./reviews-service')
const { requireAuth } = require('../middleware/basic-auth')

const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

reviewsRouter
  .route('/reviews')
  .get((req, res) => {
    res.json(reviews)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { place_id, rating, text } = req.body
    if (!rating)
      return res.status(400).json({
        error: `Star rating is required`
      })
    if (!text)
      return res.status(400).json({
        error: `Text review is required`
      })

    // newReview.author = req.user.id
    const id = uuid()
    const newReview = {
      id: id,
      rating: rating,
      text: text,
      author: TBD,
      place_id: place_id,
      images: []
    }
    reviews.push(newReview)
    res
    .status(201)
    .location(`http://localhost:8000/reviews/${id}`)
    .json(newReview)
  })

    
    /*ReviewsService.insertReview(
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
  })*/

module.exports = reviewsRouter