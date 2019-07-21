const express = require('express')
const places = require('../places.js');
const reviews = require('../reviews.js');
const users = require('../users.js');

const placesRouter = express.Router()

placesRouter
  .route('/places')
  .get((req, res) => {
    const { searchTerm = '', category='', neighborhood='' } = req.query
    let results = places
    if (searchTerm) {
      results = places.filter(place => (place.name.toLowerCase().includes(searchTerm.toLowerCase()))
      || place.place_descriptors.includes(searchTerm.toLowerCase()) || place.place_category.includes(searchTerm.toLowerCase()))
    } 
    if (category) {
      results = places.filter(place => place.category.includes(category))
    } 
    if (neighborhood) {
      results = places.filter(place => place.neighborhood.includes(neighborhood))
    } 
    res.json(results)
  })

placesRouter
  .route('/places/:placeId')
  .get((req, res) => {
    const { placeId } = req.params
    const place = places.find(place => place.id == placeId)
    if (!place) {
      return res.status(404).send('Place not found')
    }
    res.json(place)
  })

placesRouter
.route('/places/:placeId/reviews')
.get((req, res) => {
  const { placeId } = req.params
  const place = places.find(place => place.id == placeId)
  if (!place) {
    return res.status(404).send('Place not found')
  }
  const placeReviews = [ reviews.find(review => review.place_id == placeId) ]
  res.json(placeReviews)
})

module.exports = placesRouter