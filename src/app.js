require('dotenv').config()
const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

const places = require('./places.js');

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/places', (req, res) => {
  const { searchTerm = '', category='all', neighborhood='All Portland', sort='' } = req.query
  let results = places.filter(place => (place.name.toLowerCase().includes(searchTerm.toLowerCase())
      || place.descriptors.includes(searchTerm.toLowerCase()) || place.category.includes(searchTerm.toLowerCase())) 
      && (place.category.includes(category) || category === 'all') 
      && (neighborhood === place.neighborhood || neighborhood === 'All Portland'))
  
  res.json(results)
})

app.use(function errorHandler(error, req, res, next) {
  let response
    if (process.env.NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })
  
module.exports = app