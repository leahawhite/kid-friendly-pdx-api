const PlacesService = {
  getAllPlaces(knex) {
    return knex
      .select('*')
      .from('places')
  },
  getById(knex, id) {
    return knex.from('places').select('*').where('id', id).first()
  }
}

module.exports = PlacesService