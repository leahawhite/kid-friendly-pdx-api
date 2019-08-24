select reviews.id, reviews.rating, reviews.text, reviews.user_id, reviews.place_id,
	(select to_json(array_agg(to_json(i)))
		from (select images.id, images.src, images.title, images.user_id, images.place_id
			from images join reviews 
			on reviews.user_id=images.user_id
			and reviews.place_id=images.place_id
			group by reviews.id, images.id
			order by images.id
	 ) i
	 ) as images
from reviews