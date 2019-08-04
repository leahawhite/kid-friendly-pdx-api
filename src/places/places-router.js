const express = require('express')
const PlacesService = require('./places-service')

const placesRouter = express.Router()

placesRouter
  .route('/')
  /* .get((req, res) => {
    const { searchTerm='', category='', neighborhood='' } = req.query
    let results = places
    if (searchTerm) 
      results = places.filter(place => (place.name.toLowerCase().includes(searchTerm.toLowerCase()))
      || (place.descriptors.includes(searchTerm.toLowerCase())) || (place.category.includes(searchTerm.toLowerCase())))
    if (category) 
      results = results.filter(place => place.category.includes(category))
    if (neighborhood)
      results = results.filter(place => place.neighborhood.includes(neighborhood))
    res.json(results)
  })*/
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    const { searchTerm, category, neighborhood } = req.query
    console.log('req.query', req.query)
    console.log('searchTerm', searchTerm)
    PlacesService.filterPlaceResults(knexInstance, searchTerm, category, neighborhood)
    .then(places => {
      res.json(places)
    })
    
    /*.then(places => {
      res.json(places.map(place => ({
        id: place.id,
        name: place.name,
        address: place.address,
        city: place.city,
        state: place.state,
        zipcode: place.zipcode,
        latitude: place.latitude,
        longitude: place.longitude,
        neighborhood: place.neighborhood,
        phone: place.phone,
        website: place.website,
        date_added: new Date(place.date_added).toLocaleString(),
        category: place.category,
        descriptors: place.descriptors,
        features: place.features
      })))
    })*/
    .catch(next)
  })

placesRouter
  .route('/:placeId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlacesService.getById(knexInstance, req.params.place_id)
      .then(place => {
        if (!place) {
          return res.status(404).json({
            error: { message: `Place doesn't exist`}
          })
        }
        res.json({
          id: place.id,
          name: place.name,
          address: place.address,
          city: place.city,
          state: place.state,
          zipcode: place.zipcode,
          latitude: place.latitude,
          longitude: place.longitude,
          neighborhood: place.neighborhood,
          phone: place.phone,
          website: place.website,
          date_added: new Date(place.date_added).toLocaleString(),
          category: place.category,
          descriptors: place.descriptors,
          features: place.features
        })
      })
      .catch(next)
  })
  
placesRouter
  .route('/:placeId/reviews')
  .get((req, res) => {
    const { placeId } = req.params
    const place = places.find(place => place.id == placeId)
    if (!place) {
      return res.status(404).send('Place not found')
    }
    const placeReviews = [ reviews.filter(review => review.place_id == placeId) ]
    res.json(placeReviews)
  })

module.exports = placesRouter