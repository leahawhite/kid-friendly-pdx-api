select 
	places.id,
	places.name,
	places.address,
	places.city,
	places.state,
	places.zipcode,
	places.latitude,
	places.longitude,
	places.neighborhood,
	places.phone,
	places.website,
	places.date_created,
	places.category,
	places.descriptors,
	places.features,
	(
		select array_to_json(array_agg(row_to_json(h)))
		from (
		 select day_id as "dayOfWeek", opens, closes 
		 from place_hours
		 where place_id=places.id
		 order by place_id, day_id
		 ) h              
		) as hours
	from places join place_hours on places.id = place_hours.place_id
	group by places.id
	order by places.id