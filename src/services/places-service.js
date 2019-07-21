const PlacesService = {
  getAllPlaces(knex) {
    return knex
      .select(
        '*'
        /*'id', 
        'address1', 
        'address2', 
        'city', 
        'state', 
        'zipcode', 
        'latitude', 
        'longitude', 
        'neighborhood', 
        'hours', 
        'phone', 
        'website', 
        'date_added', 
        'category', 
        'descriptors', 
        'features', 
        'images'*/)
      .from('places', jsonb_array_elements(places.hours))
  },
  getById(knex, id) {
    return knex.from('places').select('*').where('id', id).first()
  }
}

module.exports = PlacesService