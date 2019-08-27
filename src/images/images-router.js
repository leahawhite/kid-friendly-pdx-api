require('dotenv').config()
const express = require('express')
const path = require('path')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')
const ImagesService = require('./images-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "kid-friendly",
  allowedFormats: ["jpg", "png", "gif"],
  transformation: [{ width: 456, height: 456, crop: "fill", gravity: "face" }]
})
const parser = multer({ storage: storage }).array('file')

const imagesRouter = express.Router()

imagesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ImagesService.getAllImages(knexInstance)
      .then(images => {
        res.json(images.map(ImagesService.serializeImage))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const images = req.body
    console.log('images', images)
    const userId = req.user.id
    images.map(image => {
      const { id, src, place_id, title } = image
      const requiredFields = { id, src, place_id}
  
      for (const [key, value] of Object.entries(requiredFields))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })
    
      const newImage = { id, src, place_id, title }
      newImage.user_id = userId

      ImagesService.insertImage(
        req.app.get('db'),
        newImage
      )
        .then(image => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${image.id}`))
            .json(ImagesService.serializeImage(image))
        })
        .catch(next)
    })
  })
  
imagesRouter
  .route('/:image_id')
  .get(checkImageExists, (req, res, next) => {
    res.json(ImagesService.serializeImage(res.image))
  })

imagesRouter
// should I use next middleware error handling instead of cloudinary's? how to format?
  .route('/upload')
  .post((req, res)  => {
    parser(req, res, function(err) {
      const images = req.files
      if (err) {
        return res.status(500).json(err)
      }
      return res
        .status(201)
        .json(images/*.map(image => ImagesService.serializeCloudinaryImage(image))*/)
    })
  })

async function checkImageExists(req, res, next) {
  try {
    const image = await ImagesService.getById(
      req.app.get('db'),
      req.params.image_id
    )

    if (!image)
      return res.status(404).json({
        error: `Image doesn't exist`
      })

    res.image = image
    next()
  } catch (error) {
    next(error)
  }
}
  
module.exports = imagesRouter