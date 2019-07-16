const express = require('express')
const places = require('../places');

const placesRouter = express.Router()

placesRouter
  .route('/places')
  .get((req, res) => {
    const { searchTerm = '', category='all', neighborhood='All Portland', sort='' } = req.query
    const results = places.filter(place => (place.name.toLowerCase().includes(searchTerm.toLowerCase())
        || place.descriptors.includes(searchTerm.toLowerCase()) || place.category.includes(searchTerm.toLowerCase())) 
        && (place.category.includes(category) || category === 'all') 
        && (neighborhood === place.neighborhood || neighborhood === 'All Portland'))
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

module.exports = placesRouter