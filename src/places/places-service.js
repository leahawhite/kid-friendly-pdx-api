const PlacesService = {
  getAllPlaces(db) {
    return db
      .from('places')
      .select(
        'places.id',
        'places.name',
        'places.address',
        'places.city',
        'places.state',
        'places.zipcode',
        'places.latitude',
        'places.longitude',
        'places.neighborhood',
        'places.phone',
        'places.website',
        'places.date_added',
        'places.category',
        'places.descriptors',
        'places.features',
        /* db.raw(
          `SELECT array_to_json(array_agg(row_to_json(h)))
            FROM (
            SELECT day_id as "dayOfWeek", opens, closes 
            FROM place_hours
            WHERE place_id=places.id
            ORDER BY place_id, day_id
            ) h              
          ) AS "hours"`
        )*/
      )  
      /*.leftJoin(
        'place_hours AS ph',
        'places.id',
        'ph.place_id'
      )*/
      .groupBy('places.id')
      .orderBy('places.id')
  },
  getById(db, id) {
    return db.from('places').select('*').where('id', id).first()
  }
}

module.exports = PlacesService