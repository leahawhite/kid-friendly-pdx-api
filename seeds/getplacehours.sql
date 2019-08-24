select 
	place_hours.day_id,
	place_hours.opens,
	place_hours.closes
from places join place_hours 
on places.id = place_hours.place_id
group by places.id, place_hours.place_id
order by places.id, place_hours.day_id;

