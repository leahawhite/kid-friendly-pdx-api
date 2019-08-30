BEGIN;

TRUNCATE images, reviews, users, places, place_hours, category, place_category, descriptors, place_descriptors RESTART IDENTITY CASCADE;

INSERT INTO places
  (name, address, city, state, zipcode, latitude, longitude, neighborhood, phone, website, date_created, features)
VALUES
  ('Lents Park', '4808 SE 92nd Ave', 'Portland', 'OR', '97266', '45.479470', '-122.568630', 'SE', '503-823-7529', 'https://www.portlandoregon.gov/parks/68209', '2019-08-24', '{"playground", "all ages", "wildlife/nature", "stroller accessible", "athletic fields"}'),
  ('Pearson Field Education Center', '201A East Reserve Street', 'Vancouver', 'WA', '98661', '45.621460', '-122.652020', 'Vancouver', '360-992-1800', 'https://www.pearsonfieldeducation.org', '2019-08-24', '{"all ages", "friendly staff", "rainy day fun"}'),

  
INSERT INTO place_hours
  (day_id, opens, closes, place_id)
VALUES
  (1, '05:00 am', '12:00 am', 6),
  (2, '05:00 am', '12:00 am', 6),
  (3, '05:00 am', '12:00 am', 6),
  (4, '05:00 am', '12:00 am', 6),
  (5, '05:00 am', '12:00 am', 6),
  (6, '05:00 am', '12:00 am', 6),
  (7, '05:00 am', '12:00 am', 6),
  (1, 'closed', 'closed', 7),
  (2, 'closed', 'closed', 7),
  (3, 'closed', 'closed', 7),
  (4, 'closed', 'closed', 7),
  (5, 'closed', 'closed', 7),
  (6, '10:00 am', '05:00 pm', 7),
  (7, 'closed', 'closed', 7),

INSERT INTO category
  (category_name)
VALUES  
  1('restaurant'),
  2('toy store'),
  3('indoor play'),
  4('park'),
  5('attraction'),
  6('museum');

INSERT INTO place_category
  (place_id, category_id)
VALUES
  (6, 4),
  (7, 5),
  (7, 6);

INSERT INTO descriptors
  (descriptor)
VALUES  
  1('pizza'),
  2('arcade'),
  3('beer'),
  4('cafe'),
  5('bakery'),
  6('sandwiches'),
  7('burgers'),
  8('toy store'),
  9('indoor play'),
  10('community space'),
  11('garden'),
  12('park'),
  13('wildlife'),
  14('playground'),
  15('athletic fields'),
  16('picnic area'),
  17('flight simulator'),
  18('tours'),
  19('STEM activities')


INSERT INTO place_descriptors
  (place_id, descriptor_id)
VALUES
  (6, 12),
  (6, 14),
  (6, 15),
  (7, 17),
  (7, 18),
  (7, 19);

INSERT INTO users
  (id, display_name, email, password, date_created)
VALUES
  (4, 'Demo', 'demo@demo.com', '$2a$12$NM7zDbI8ZcLxLZsf0VwQzedbI38CTjBmsaxaK4pII8ysG6YoAi.1q', '2019-08-29');

INSERT INTO reviews
  (rating, text, date_created, place_id, user_id)
VALUES
  (3, 'Lents Park has a lot going for it -- a dog park, community garden, unique playground, plenty of sports fields, a running track, and even the Portland Pickles baseball games. But when I visited recently with my 3-year-old, it was in pretty shabby shape. We came on a Monday morning, so it''s possible we just saw the aftermath of a busy summer weekend, but there was trash everywhere, including the playground, and the whole park just had a kind of derelict vibe. It was a shame, since I''ve had plenty of good experiences here in the past.', '2019-08-24', 6, 2),
  (5, 'We loved this small museum in Vancouver. Most vehicle-based museums don''t actually let you near most of the machines, but this one lets you explore the interior of quite a few different historic planes. They pack a lot into a small room! There are also quite a few different STEM activities to do and plenty of friendly volunteers to guide kids through them. Great vibe here. We''ll come back.', '2019-08-24', 7, 2);

  
INSERT INTO images
  (id, src, title, place_id, user_id, date_created)
VALUES
  (21, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566710012/kid-friendly/lents_playground_plz5xq.jpg', 'Lents playground spinner', 6, 1, '2019-08-29'),
  (22, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566710012/kid-friendly/lents_play_sbvngh.jpg', 'Lents Park playground', 6, 1, '2019-08-29'),
  (23, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566710012/kid-friendly/lents_fields_mdxxat.jpg', 'Lents Park new soccer field', 6, 1, '2019-08-29'),
  (24, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566712587/kid-friendly/Pearson-Air-Museum_fcc6yn.jpg', 'Pearson Air Museum exterior', 7, 1, '2019-08-29'),
  (25, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566712587/kid-friendly/pearson_interior_oh7aab.jpg', 'museum interior', 6, 1, '2019-08-29'),
  (26, 'https://res.cloudinary.com/kid-friendly-pdx/image/upload/v1566712597/kid-friendly/planes_outside_pearson_mhadke.jpg', 'planes to explore outside', 6, 1, '2019-08-29');
COMMIT;