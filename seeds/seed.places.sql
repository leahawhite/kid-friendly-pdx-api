BEGIN;

TRUNCATE places RESTART IDENTITY CASCADE;

INSERT INTO places
  (name, address, city, state, zipcode, latitude, longitude, neighborhood, phone, website, date_added, category, descriptors, features)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', '503-232-3004', 'http://atlaspizzapdx.com', now(), '{"restaurant"}', '{"pizza", "arcade", "beer"}', '{"toys", "play area", "arcade", "quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Grand Central Bakery', '4412 SE Woodstock Blvd', 'Portland', 'OR', '97206', '45.479040', '-122.616120', 'SE', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now(), '{"restaurant"}', '{"cafe", "bakery", "pastries"}', '{"quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Hopworks Urban Brewery: Powell', '2944 SE Powell Blvd', 'Portland', 'OR', '97206', '45.497010', '-122.635210', 'SE', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now(), '{"restaurant"}', '{"pizza", "burgers", "beer"}', '{"toys", "play area", "all ages", "comfortable seating", "friendly staff", "kids menu", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Hammer and Jacks', '6416 SE Foster Rd', 'Portland', 'OR', '97206', '45.497560', '-122.611350', 'SE', '503-894-9150', 'https://www.hammerandjacks.com/', now(), '{"toy store", "indoor play"}', '{"toy store", "indoor play", "community space"}', '{"toys", "play area", "quick service", "comfortable seating", "friendly staff", "changing station", "flexible"}'),
  ('Crystal Springs Rhododendron Garden', '5801 SE 28th Ave', 'Portland', 'OR', '97202', '45.480400', '-122.635399', 'SE', '503-771-8386', 'http://www.rhodies.org/xstl/xstl_faq.htm', now(), '{"park", "attraction"}', '{"garden", "park", "wildlife"}', '{"all ages", "friendly staff", "patio/sidewalk", "wildlife/nature", "stroller accessible", "rainy day fun"}');  

COMMIT;