const ReviewsService = {
  getById(db, id) {
    return db
      .from('reviews')
      .select(
        'reviews.id',
        'reviews.rating',
        'reviews.text',
        'reviews.date_created',
        'reviews.place_id',
        // 'reviews.images',
        db/raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  user.id,
                  user.display_name
              ) tmp)
            )
          ) AS "author"`
        )
      )
      .leftJoin(
        'users',
        'reviews.author',
        'user.id'
      )
      .where('reviews.author', id)
      .first()
  },

  insertReview(db, newReview) {
    return db
    
  }
}