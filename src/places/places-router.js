const express = require('express')
const PlacesService = require('./places-service')

const placesRouter = express.Router()

placesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    const { searchTerm, category, neighborhood } = req.query
    PlacesService.filterPlaceResults(knexInstance, searchTerm, category, neighborhood)
    .then(places => { 
      res.json(places.map(PlacesService.serializePlace))
    })
    .catch(next)
  })
  
placesRouter
  .route('/:place_id')
  .all(checkPlaceExists)
  .get((req, res) => {
    res.json(PlacesService.serializePlace(res.place))
  })
  
placesRouter
  .route('/:place_id/reviews')
  .all(checkPlaceExists)
  .get((req, res, next) => {
    PlacesService.getReviewsForPlace(
      req.app.get('db'),
      req.params.place_id
    )
    .then(reviews => {
      res.json(reviews.map(PlacesService.serializePlaceReview))
    })
    .catch(next)
  })

  async function checkPlaceExists(req, res, next) {
    try {
      const place = await PlacesService.getById(
        req.app.get('db'),
        req.params.place_id
      )
  
      if (!place) {
        return res.status(404).json({
          error: `Place not found`
        })
      }
      res.place = place
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = placesRouter