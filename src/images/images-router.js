require('dotenv').config()
const express = require('express')
const images = require('../images.js');
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')
const ImagesService = require('./images-service')

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
  .get((req, res) => {
    let results = images
    res.json(results)
  })
  .post()
  
imagesRouter
  .route('/:imageId')
  .get((req, res) => {
    const { imageId } = req.params
    const image = images.find(image => image.id == imageId)
    if (!image) {
      return res.status(404).send('Image not found')
    }
    res.json(image)
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
  .post(parser.array('myImages'), (req, res) => {
    const images = req.files
    res.status(201).json(images.map(image => ({
       id: image.public_id,
       src: image.secure_url,
      })))
  })

  
module.exports = imagesRouter
