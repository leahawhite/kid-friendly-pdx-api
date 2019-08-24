select name from places pl join place_category pc on pl.id = pc.place_id
join category c on pc.category_id = c.id
where c.category_name = 'restaurant';