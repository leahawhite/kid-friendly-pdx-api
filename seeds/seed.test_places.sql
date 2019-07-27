BEGIN;

TRUNCATE places RESTART IDENTITY CASCADE;

INSERT INTO places
  (name, address, city, state, zipcode, latitude, longitude, neighborhood, phone, website, date_added, category, descriptors, features)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', '503-232-3004', 'http://atlaspizzapdx.com', now(), '{"restaurant"}', '{"pizza", "arcade", "beer"}', '{"toys", "play area", "arcade", "quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Grand Central Bakery', '4412 SE Woodstock Blvd', 'Portland', 'OR', '97206', '45.479040', '-122.616120', 'SE', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now(), '{"restaurant"}', '{"cafe", "bakery", "pastries"}', '{"quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'),
  ('Hopworks Urban Brewery: Powell', '2944 SE Powell Blvd', 'Portland', 'OR', '97206', '45.497010', '-122.635210', 'SE', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now(), '{"restaurant"}', '{"pizza", "burgers", "beer"}', '{"toys", "play area", "all ages", "comfortable seating", "friendly staff", "kids menu", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}');
  
COMMIT;