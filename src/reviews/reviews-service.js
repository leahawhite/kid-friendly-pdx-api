const xss = require('xss')

const ReviewsService = {
  getAllReviews(db) {
    return db
      .from('reviews')
      .select(
        'reviews.id',
        'reviews.rating',
        'reviews.text',
        'reviews.date_created',
        'reviews.place_id',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                users.id,
                users.display_name
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'users',
        'reviews.user_id',
        'users.id'
      )
  },
  getById(db, id) {
    return ReviewsService.getAllReviews(db)
      .where('reviews.id', id)
      .first()
  },
  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review =>
        ReviewsService.getById(db, review.id)
      )
  },
  serializeReview(review) {
    return {
      id: review.id,
      rating: review.rating,
      text: xss(review.text),
      place_id: review.place_id,
      date_created: new Date(review.date_created),
      user: review.user || {}
    }
  }
}

module.exports = ReviewsService