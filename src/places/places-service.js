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
        db.raw(
          `(
            select to_json(array_agg(to_json(h)))
            from (
             select day_id as "dayOfWeek", opens, closes 
             from place_hours
             where place_id=places.id
             order by place_id, day_id
             ) h              
            ) as hours`
        ),
        db.raw(
          `(
            select to_json(array_agg(to_json(i)))
            from (
             select id, src, title, place_id, user_id, date_added 
             from images
             where place_id=places.id
             order by user_id
             ) i              
            ) as images`
        ),
        db.raw(
          `(
            select to_json(array_agg(to_json(r)))
            from (
             select id, rating, text, place_id, user_id, date_created 
             from reviews
             where place_id=places.id
             order by date_created DESC, user_id
             ) r              
            ) as reviews`
        ),
        db.raw(
          `count(DISTINCT reviews) AS number_of_reviews`
        ),
        db.raw(
          `AVG(reviews.rating) AS average_review_rating`
        ),
      )
      .leftJoin('place_hours', 'place_hours.place_id', 'places.id')
      .leftJoin('images', 'images.place_id', 'places.id')  
      .leftJoin('reviews', 'reviews.place_id', 'reviews.id')
      .groupBy('places.id')
      .orderBy('places.id')
  },
  getById(db, id) {
    return db.from('places').select('*').where('id', id).first()
  },
  filterPlaceResults(db, searchTerm, category, neighborhood) {
    return db
    .from('places')
    .select('name')
    .where('name', 'ILIKE', `%${searchTerm || ''}%`)
    
    /*.where(query => {
      if (searchTerm) {
        query.where('name', 'ILIKE', `%${searchTerm}%`)
        query.orWhereRaw(category @> array[`%${searchTerm}%`])
        query.orWhere('features', 'ILIKE', `%${searchTerm}%`)
      }
      if (category) {
        query.where(`${category}`, 'category')
      }
      if (neighborhood) {
        query.where(`${neighborhood}`, 'neighborhood')
      }
    })*/
      
    
  },
  paginatePlaces(db, page) {
    const placesPerPage = 10
    const offset = placesPerPage * (page - 1)
    return db
    .from('places')
    .select('*')
    .limit(placesPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
  }

}

module.exports = PlacesService