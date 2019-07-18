BEGIN;

TRUNCATE 
  place_images,
  place_features, 
  features, 
  descriptors, 
  place_descriptors,
  place_category,
  category,
  place_hours,
  places 
  RESTART IDENTITY CASCADE;

INSERT INTO places
  (name, address1, address2, city, state, zipcode, latitude, longitude, neighborhood, phone, website, date_added)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', null, 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', '503-232-3004', 'http://atlaspizzapdx.com', now() ),
  ('Grand Central Bakery', '4412 SE Woodstock Blvd', null, 'Portland', 'OR', '97206', '45.479040', '-122.616120', 'SE', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now()),
  ('Hopworks Urban Brewery: Powell', '2944 SE Powell Blvd', null, 'Portland', 'OR', '97206', '45.497010', '-122.635210', 'SE', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now()),
  ('Hammer and Jacks', '6416 SE Foster Rd', null, 'Portland', 'OR', '97206', '45.497560', '-122.611350', 'SE', '503-894-9150', 'https://www.hammerandjacks.com/', now()),
  ('Crystal Springs Rhododendron Garden', '5801 SE 28th Ave', null, 'Portland', 'OR', '97202', '45.480400', '-122.635399', 'SE', '503-771-8386', 'https://www.portlandoregon.gov/parks/finder/index.cfm?action=ViewPark&PropertyID=27', now());  

INSERT INTO place_hours
  (dayOfWeek, opens, closes, place_id)
VALUES
  ('Monday', '12:00 pm', '11:00 pm', 1),
  ('Tuesday', '12:00 pm', '11:00 pm', 1),
  ('Wednesday', '12:00 pm', '11:00 pm', 1),
  ('Thursday', '12:00 pm', '11:00 pm', 1),
  ('Friday', '12:00 pm', '12:00 am', 1),
  ('Saturday', '12:00 pm', '12:00 am', 1),
  ('Sunday', '12:00 pm', '11:00 pm', 1),
  ('Monday', '7:00 am', '6:00 pm', 2),
  ('Tuesday', '7:00 am', '6:00 pm', 2),
  ('Wednesday', '7:00 am', '6:00 pm', 2),
  ('Thursday', '7:00 am', '6:00 pm', 2),
  ('Friday', '7:00 am', '6:00 pm', 2),
  ('Saturday', '7:00 am', '6:00 pm', 2),
  ('Sunday', '7:00 am', '6:00 pm', 2),
  ('Monday', '11:00 am', '11:00 pm', 3),
  ('Tuesday', '11:00 am', '11:00 pm', 3),
  ('Wednesday', '11:00 am', '11:00 pm', 3),
  ('Thursday', '11:00 am', '11:00 pm', 3),
  ('Friday', '11:00 am', '12:00 am', 3),
  ('Saturday', '11:00 am', '12:00 am', 3),
  ('Sunday', '11:00 am', '11:00 pm', 3),
  ('Monday', '10:00 am', '5:00 pm', 4),
  ('Tuesday', '10:00 am', '5:00 pm', 4),
  ('Wednesday', '10:00 am', '5:00 pm', 4),
  ('Thursday', '10:00 am', '5:00 pm', 4),
  ('Friday', '10:00 am', '6:00 pm', 4),
  ('Saturday', '10:00 am', '6:00 pm', 4),
  ('Sunday', '10:00 am', '5:00 pm', 4),
  ('Monday', '6:00 am', '10:00 pm', 5),
  ('Tuesday', '6:00 am', '10:00 pm', 5),
  ('Wednesday', '6:00 am', '10:00 pm', 5),
  ('Thursday', '6:00 am', '10:00 pm', 5),
  ('Friday', '6:00 am', '10:00 pm', 5),
  ('Saturday', '6:00 am', '10:00 pm', 5),
  ('Sunday', '6:00 am', '10:00 pm', 5);

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

INSERT INTO features
  (feature)
VALUES  
  ('toys'), 
  ('play area'), 
  ('arcade'),
  ('quick service'),
  ('all ages'),
  ('comfortable seating'),
  ('friendly staff'),
  ('kids menu'),
  ('highchairs/boosters'),
  ('changing station'),
  ('flexible'),
  ('patio/sidewalk'),
  ('wildlife/nature'),
  ('stroller accessible'),
  ('rainy day fun');

INSERT INTO place_features
  (place_id, feature_id)
VALUES  
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 11),
  (1, 12),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12),
  (3, 1),
  (3, 2),
  (3, 5),
  (3, 6),
  (3, 7),
  (3, 8),
  (3, 9),
  (3, 10),
  (3, 11),
  (3, 12),
  (4, 1),
  (4, 2),
  (4, 4),
  (4, 6),
  (4, 7),
  (4, 10),
  (4, 11),
  (5, 5),
  (5, 7),
  (5, 12),
  (5, 13),
  (5, 14),
  (5, 15);

INSERT INTO place_images
  (src, title, place_id)
VALUES
  ('https://lh3.googleusercontent.com/ir83SjI1lJpHK4E5vQFwD7LfyE__eKaIvBtmFf1nV5wyfq-z5LVe4u7PuQvQ7ycqsFlGMe5vw3UNRB86G3SjLckIZKHgFSkz0-oQdLAAP2UxlUwq-HqDA116RjcI3iG-lA1ftsYr9S4=w2400', 'Atlas Pizza''s ''Jalapeno Popper'' pie', 1),
  ('https://lh3.googleusercontent.com/CjUvS4WgCiSRTsUUAryiPcczqAdyaSDhDg1ZTT6OrdgjfdNiTE5Q14pwI-C2m49tSjQHMnBxDgpiZyYZkxEDE3KzI3DWLsT631ROrF1zTuJcBqEXcRN8PP5U3EcG-bmMclE_uKmWh2E=w2400', 'A rainbow over Foster Blvd', 1),
  ('https://lh3.googleusercontent.com/2-dLhEkgnU4-n62Nq4X1X2u5FjGRp5Hb5Wkwq1m1cuHbAqdJmrhih2MKdggGIncaWTMf3STdOGZgOMwaYa3nx1k6j2dA6Fs6kyys-i1yW2kw1jxG-Q9EmijXM0EosofSIpsTyoAdJns=w2400', 'Fresh loaf!', 2),
  ('https://lh3.googleusercontent.com/HDU-n0GE-3Glgn8o1WEDaRsUzhuA5qvLqoZjZzQCx1LwtOucN9zmWZ3YX_Lnce4_kp-sBcB8-6wXjiq9NjacD27tysnJt6eITsmlWGHj1WIRiCpLIzme95n-vK3ydgNBizXtHXTrkMY=w2400', 'A box of assorted pastries', 2),
  ('https://lh3.googleusercontent.com/7dA-7cI0-Ta-7QQ3k4ttgNuKjFNBhizMLXGF873v5nOWioblzEvWQn5r9HrZ4U13C31lZARcw3Yh6ZqiPX0hfqtRE9tpy3h9-toE9vf2QHDGd-355aLAWV5mOprQTJ0CybWQwO3zj-Y=w2400', 'Beer sampler', 3),
  ('https://lh3.googleusercontent.com/QsdaLX-XqlpIMZO2I1rv_pBubbRyxB2PHg4c2B-Pg2nSU0gV1Cgkbq759pKLU-ZleVam7r_Kh7DOiFjiCUlc6fzPFADGTgtlV73QeFk_0JUM_PAyaHFtn7b81p0QhjQIJjMfiaiKHNc=w2400', 'HUB exterior', 3),
  ('https://lh3.googleusercontent.com/t2wKP7xtx15nC8iSL6XGdR1oC5uYo6K8wxSFoC3LBBkVXlc7941TktpLLWV5VGmx_xFH0tCd-50qASnbtPXNtCo-xphQ16G33oZKeXLc-pRCe8wc5bnbpt-HqMqTsO3-7OmEI5t27EM=w2400', 'Hammer and Jacks'' storefront', 4),
  ('https://lh3.googleusercontent.com/gfamj0g-ieATA5fUX3ocTGlHAdKb-Bqrq-xm76mztNuWkijxGqREhE4htmH39rtUslLznfmLORL4ZMmN8tbKOd45z3izdHEfqHfX7MCKg86AWxFFba9XnmLYJIlaG-6oF0USXNrktEs=w2400', 'Unicorn party balloon!', 4),
  ('https://lh3.googleusercontent.com/mUsYElLLTLWoxwp5ydk9H-Z6prAG-92_NCzh3CS9xdbDqyr8RkOxnulQLmLUs-lZPtdzF3Vs9MB86qCvQXL_wPdkla3l15NkAlkHGYAbVx9yVKz-iuMh32n6pnK2iMSAxtvtvSXXoYk=w2400', 'Castle fort slide and play area', 4),
  ('https://lh3.googleusercontent.com/CSSSQJ8V9mZ6jQwNCC1PMSaCimRjCjwxsKpyihqe5j57OWtVPkR3SNneSRiGZSbQy62Z1haz-p638MLFraVE_lgcZdsIeW4x_-r_JSziuRfof7-ztkteQ6cZvju0lvsYW8bvACKcfis=w2400', 'Pink rhododendrons in bloom', 5),
  ('https://lh3.googleusercontent.com/-bXD01_TzgdWhrKltvgPjK6a4YhpWY2jawymfmd4gKVcu869c4kJs-s2tlp5n_40rEDCYopM99TBDggJ0CVFI7Okx8b6TDtPsSswqY2S4v2DnMRq4e8SRYXcSyDnP8KNt3YY6zQvqb0=w2400', 'Ducks overlooking the garden', 5),
  ('https://lh3.googleusercontent.com/tn6yQ6erdO7uwlXXn3v7jXkDz6avzH84V1BUzZb1yEnDTIUWF-vnDkqEFWTBu-xxicSP3XLWPYPfs5Z7f-AKys4Lr0i8NcC8G7dgf3UH0RjlHr8axiGMbVs-LDbmuPokPZzyYLKSRpc=w2400', 'Garden path by the pond', 5);

COMMIT;