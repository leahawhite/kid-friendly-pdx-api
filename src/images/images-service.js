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
  uploadImagesToCloud() {

  },
  serializeImage(image) {
    return {
      id: image.id,
      src: image.src,
      title: image.title,
      place_id: image.place_id,
      user_id: image.user_id,
      date_added: new Date(image.date_added).toLocaleString(),
    }
  },
}

module.exports = ImagesService