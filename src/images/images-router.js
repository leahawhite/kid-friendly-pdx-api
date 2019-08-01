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
const parser = multer({ storage: storage })

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
  // works but trying combo
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { id, src, title, place_id } = req.body
    const newImage = { id, src, title, place_id }
  
    for (const [key, value] of Object.entries(newImage))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
  
    newImage.user_id = req.user.id

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
  
imagesRouter
  .route('/:imageId')
  .get(checkImageExists, (req, res, next) => {
    res.json(ImagesService.serializeImage(res.image))
  })

/*imagesRouter
  .route('/upload')
  .post(parser.single('myImage'), (req, res) => {
    console.log(req.file)
    const { public_id, secure_url } = req.file
    const cloudImage = {
      id: public_id,
      src: secure_url
    }
    res
    .status(201)
    .json(cloudImage)
  })*/

imagesRouter
  .route('/upload')
  .post(parser.array('file'), (req, res, err) => {
    const images = req.files
    console.log(images)
    res.status(201).json(images.map(image => ({
       id: image.public_id,
       src: image.secure_url,
      })))
  })
  /*.post(requireAuth, parser.array('myImages'), (req, res, next) => {
    const images = req.files
    console.log(images)
    console.log('req.body', req.body)
    images.map(image => ({
      id: image.public_id,
      src: image.secure_url,
    }))
    req.body.place_id = image.place_id
    req.body.title = image.title
  })
    // cloudImages are req.files from upload; on client side, user confirms images and they become req.body

    // id and src will come from cloudImages, title and place_id from client form
    /*const { id, src, title, place_id } = req.body
    const newImage = { id, src, title, place_id }
  
    for (const [key, value] of Object.entries(newImage))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    // user_id comes from auth 
    newImage.user_id = req.user.id 
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
    })*/


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