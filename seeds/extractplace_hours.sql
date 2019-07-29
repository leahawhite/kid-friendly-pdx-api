	select array_to_json(array_agg(row_to_json(h)))
	from (
	 select day_id as "dayOfWeek", opens, closes 
	 from place_hours join places on place_id=places.id
	 order by place_id, day_id
	 ) h              