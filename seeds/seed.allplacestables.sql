BEGIN;

TRUNCATE places, place_hours, category, place_category, descriptors, place_descriptors RESTART IDENTITY CASCADE;

INSERT INTO places
  (name, address, city, state, zipcode, latitude, longitude, neighborhood, phone, website, date_created, features)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', '503-232-3004', 'http://atlaspizzapdx.com', now(), '{"toys", "play area", "arcade", "quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Grand Central Bakery', '4412 SE Woodstock Blvd', 'Portland', 'OR', '97206', '45.479040', '-122.616120', 'SE', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now(), '{"quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Hopworks Urban Brewery: Powell', '2944 SE Powell Blvd', 'Portland', 'OR', '97206', '45.497010', '-122.635210', 'SE', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now(), '{"toys", "play area", "all ages", "comfortable seating", "friendly staff", "kids menu", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Hammer and Jacks', '6416 SE Foster Rd', 'Portland', 'OR', '97206', '45.497560', '-122.611350', 'SE', '503-894-9150', 'https://www.hammerandjacks.com/', now(), '{"toys", "play area", "quick service", "comfortable seating", "friendly staff", "changing station", "flexible"}'),
  ('Crystal Springs Rhododendron Garden', '5801 SE 28th Ave', 'Portland', 'OR', '97202', '45.480400', '-122.635399', 'SE', '503-771-8386', 'http://www.rhodies.org/xstl/xstl_faq.htm', now(), '{"all ages", "friendly staff", "patio/sidewalk", "wildlife/nature", "stroller accessible", "rainy day fun"}');  

INSERT INTO place_hours
  (day_id, opens, closes, place_id)
VALUES
  (1, '12:00 pm', '11:00 pm', 1),
  (2, '12:00 pm', '11:00 pm', 1),
  (3, '12:00 pm', '11:00 pm', 1),
  (4, '12:00 pm', '11:00 pm', 1),
  (5, '12:00 pm', '12:00 am', 1),
  (6, '12:00 pm', '12:00 am', 1),
  (7, '12:00 pm', '11:00 pm', 1),
  (1, '7:00 am', '6:00 pm', 2),
  (2, '7:00 am', '6:00 pm', 2),
  (3, '7:00 am', '6:00 pm', 2),
  (4, '7:00 am', '6:00 pm', 2),
  (5, '7:00 am', '6:00 pm', 2),
  (6, '7:00 am', '6:00 pm', 2),
  (7, '7:00 am', '6:00 pm', 2),
  (1, '11:00 am', '11:00 pm', 3),
  (2, '11:00 am', '11:00 pm', 3),
  (3, '11:00 am', '11:00 pm', 3),
  (4, '11:00 am', '11:00 pm', 3),
  (5, '11:00 am', '12:00 am', 3),
  (6, '11:00 am', '12:00 am', 3),
  (7, '11:00 am', '11:00 pm', 3),
  (1, '10:00 am', '5:00 pm', 4),
  (2, '10:00 am', '5:00 pm', 4),
  (3, '10:00 am', '5:00 pm', 4),
  (4, '10:00 am', '5:00 pm', 4),
  (5, '10:00 am', '6:00 pm', 4),
  (6, '10:00 am', '6:00 pm', 4),
  (7, '10:00 am', '5:00 pm', 4),
  (1, '6:00 am', '10:00 pm', 5),
  (2, '6:00 am', '10:00 pm', 5),
  (3, '6:00 am', '10:00 pm', 5),
  (4, '6:00 am', '10:00 pm', 5),
  (5, '6:00 am', '10:00 pm', 5),
  (6, '6:00 am', '10:00 pm', 5),
  (7, '6:00 am', '10:00 pm', 5);

INSERT INTO category
  (category_name)
VALUES  
  ('restaurant'),
  ('toy store'),
  ('indoor play'),
  ('park'),
  ('attraction'),
  ('museum');

INSERT INTO place_category
  (place_id, category_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (4, 3),
  (5, 4),
  (5, 5);

INSERT INTO descriptors
  (descriptor)
VALUES  
  ('pizza'),
  ('arcade'),
  ('beer'),
  ('cafe'),
  ('bakery'),
  ('sandwiches'),
  ('burgers'),
  ('toy store'),
  ('indoor play'),
  ('community space'),
  ('garden'),
  ('park'),
  ('wildlife');

INSERT INTO place_descriptors
  (place_id, descriptor_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 1),
  (3, 3),
  (3, 7),
  (4, 8),
  (4, 9),
  (4, 10),
  (5, 11),
  (5, 12),
  (5, 13);

COMMIT;