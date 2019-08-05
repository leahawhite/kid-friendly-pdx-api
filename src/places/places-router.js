const express = require('express')
const PlacesService = require('./places-service')

const placesRouter = express.Router()

placesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    const { searchTerm, category, neighborhood } = req.query
    PlacesService.getAllPlaces(knexInstance, searchTerm, category, neighborhood)
    .then(places => res.json(places))
    /*.then(places => {
      res.json(places.map(place => PlacesServices.serializePlace(place)))
    })*/
    .catch(next)
  })

placesRouter
  .route('/:placeId')
  .get(checkPlaceExists, (req, res) => {
    res.json(res.place)
  })
  
placesRouter
  .route('/:placeId/reviews')
  .get(/*checkPlaceExists,*/ (req, res, next) => {
    PlacesService.getReviewsForPlace(
      req.app.get('db'),
      req.params.place_id
    )
    /*.then(reviews => {
      res.json(reviews.map(PlacesService.serializePlaceReview))
    })*/
    .then(reviews => res.json(reviews))
    .catch(next)
  })

/*placesRouter
  .route('/:placeId/images')
  .get(checkPlaceExists, (req, res, next) => {
    PlacesService.getImagesForPlace(
      req.app.get('db'),
      req.params.place_id
    )
    .then(images => {
      res.json(images.map(PlacesService.serializePlaceImage))
    })
    .catch(next)
  })*/
  
  async function checkPlaceExists(req, res, next) {
    try {
      const place = await PlacesService.getById(
        req.app.get('db'),
        req.params.place_id
      )
  
      if (!place)
        return res.status(404).json({
          error: `Place not found`
        })
  
      res.place = place
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = placesRouter