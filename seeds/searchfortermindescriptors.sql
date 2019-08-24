select name from places pl join place_descriptors pd on pl.id = pd.place_id
join descriptors d on pd.descriptor_id = d.id
where d.descriptor ilike '%burger%';