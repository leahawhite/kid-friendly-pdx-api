const ImagesService = {
  serializeImage(image) {
      return {
        id: image.id,
        src: image.secure_url,
      }
  },
}