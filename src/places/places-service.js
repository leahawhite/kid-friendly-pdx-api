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
        // 'places.category',
        // 'places.descriptors',
        // 'places.features',
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
      .leftJoin('reviews', 'reviews.place_id', 'places.id')
      .groupBy('places.id')
      .orderBy('places.id')
  },
  getById(db, id) {
    return PlacesService.filterPlaceResults(db)
    // use places.id or pl.id here?
    .where('places.id', id)
    .first()
  },
  filterPlaceResults(db, searchTerm, category, neighborhood) {
    return db
    .from('places as pl')
    .select(
      'pl.id',
      'pl.name',
      'pl.address',
      'pl.city',
      'pl.state',
      'pl.zipcode',
      'pl.latitude',
      'pl.longitude',
      'pl.neighborhood',
      'pl.phone',
      'pl.website',
      'pl.date_added',
      'pl.features',
      db.raw(
        `(
          select to_json(array_agg(to_json(h)))
          from (
           select day_id as "dayOfWeek", opens, closes 
           from place_hours
           where place_id=pl.id
           order by place_id, day_id
           ) h              
          ) as hours`
      ),
      db.raw(
        `(array_agg(DISTINCT c.category_name)) as category`
      ),
      db.raw(
        `(array_agg(DISTINCT d.descriptor)) as descriptors`
      ),
      db.raw(
        `(
          select to_json(array_agg(to_json(i)))
          from (
           select id, src, title, place_id, user_id, date_added 
           from images
           where place_id=pl.id
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
           where place_id=pl.id
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
    .where(query => {
      if (searchTerm) {
        query.where('pl.name', 'ILIKE', `%${searchTerm}%`)
        query.orWhere('c.category_name', 'ILIKE', `%${searchTerm}%`)
        query.orWhere('d.descriptor', 'ilike', `%${searchTerm}%`)
      }
      if (category) {
        query.where('c.category_name', 'ilike', `${category}`)
      }
      if (neighborhood) {
        query.where('pl.neighborhood', 'ilike', `${neighborhood}`)
      }
    })
    .leftJoin('place_hours', 'place_hours.place_id', 'pl.id')
    .leftJoin('images', 'images.place_id', 'pl.id')  
    .leftJoin('reviews', 'reviews.place_id', 'pl.id')
    .leftJoin('place_category as pc', 'pc.place_id', 'pl.id')
    .leftJoin('category as c', 'c.id', 'pc.category_id')
    .leftJoin('place_descriptors as pd', 'pd.place_id', 'pl.id')
    .leftJoin('descriptors as d', 'd.id', 'pd.descriptor_id')
    .groupBy('pl.id')
    .orderBy('pl.id')
  },
  getReviewsForPlace(db, place_id) {
    return db
      .from('reviews as rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.text',
        'rev.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.display_name,
                  usr.email,
                  usr.date_created
              ) tmp)
            )
          ) AS "user"`
        ),
        db.raw(
          `(
            select to_json(array_agg(to_json(i)))
            from (
             select id, src, title, place_id, date_added, 
             (
              row_to_json(
                (SELECT u FROM (
                  SELECT
                  usr.id, 
                  usr.display_name
                ) u)
              ) as "user"
              where place_id=pl.id
              order by user_id
               ) i              
              ) as images` 
        ),
      )
      .where('rev.place_id', place_id)
      .leftJoin('users AS usr', 'rev.user_id', 'usr.id')
      .leftJoin('users AS usr',  'images.user_id', 'usr.id')
      .groupBy('rev.id', 'usr.id')
  },
  getPlaceImagesbyUser(db, user_id, place_id) {

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
  },
  serializePlace(place) {
    const { hours, images, reviews } = place
    return {
      id: place.id,
      name: place.name,
      address: place.address,
      city: place.city,
      state: place.state,
      zipcode: place.zipcode,
      latitude: place.latitude,
      longitude: place.longitude,
      neighborhood: place.neighborhood,
      phone: place.phone,
      website: place.website,
      date_added: new Date(place.date_added).toLocaleString(),
      hours: hours,
      category: place.category,
      descriptors: place.descriptors,
      features: place.features,
      images: images.map(image => (
      {
        id: image.id,
        src: image.src,
        title: image.title,
        place_id: image.place_id,
        user_id: image.user_id,
        date_added: image.date_added
      })),
      reviews: reviews.map(review => (
        {
          id: review.id,
          rating: review.rating,
          text: review.text,
          place_id: review.place_id,
          user_id: review.user_id,
          date_created: review.date_created
        })),
      number_of_reviews: Number(place.number_of_reviews),
      average_review_rating: Number(place.average_review_rating).toFixed(2)
    }
  },
  serializePlaceReview(review) {
    const { user } = review
    return {
      id: review.id,
      place_id: review.place_id,
      rating: review.rating,
      text: review.text,
      date_created: new Date(review.date_created),
      user: {
        id: user.id,
        display_name: user.display_name,
        email: user.email,
        date_created: user.date_created
      }
    }
  }
}

module.exports = PlacesService