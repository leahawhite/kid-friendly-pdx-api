const xss = require('xss')

const ImagesService = {
  getAllImages(db) {
    return db.select('*').from('images')
  },
  getById(db, id) {
    return ImagesService.getAllImages(db)
        .where('images.id', id)
        .first()
  },
  insertImage(db, newImage) {
    return db
      .insert(newImage)
      .into('images')
      .returning('*')
      .then(([image]) => image)
      .then(image =>
        ImagesService.getById(db, image.id)
      )
  },
  serializeCloudinaryImage(image) {
    return {
      id: image.public_id,
      src: image.secure_url,
    }
  },
  serializeImage(image) {
    return {
      id: image.id,
      src: xss(image.src),
      title: xss(image.title),
      place_id: image.place_id,
      user_id: image.user_id,
      date_created: new Date(image.date_created),
    }
  },
}

module.exports = ImagesService