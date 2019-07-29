const ReviewsService = {
  getAllComments(knex) {
    return knex.select('*').from('reviews')
  },
  getById(knex, id) {
    return knex
      .from('reviews')
      .select(
        'reviews.id',
        'reviews.rating',
        'reviews.text',
        'reviews.date_created',
        'reviews.place_id',
        // 'reviews.images',
        knex.raw(
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
    return knex
      .insert(newReview)
      .into('reviews')
      .return ('*')
      .then(rows => {
        return rows[0]
      })
    
  }
}

module.exports = ReviewsService