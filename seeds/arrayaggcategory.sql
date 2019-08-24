select places.name,
array_agg(category.category_name) as category
from category inner join place_category
on category.id=place_category.category_id
inner join places on places.id=place_category.place_id
group by places.id
order by places.id