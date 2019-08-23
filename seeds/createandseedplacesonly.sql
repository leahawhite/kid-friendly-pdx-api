CREATE TYPE neighborhood AS ENUM (
  'N',
  'NE',
  'NW',
  'Downtown',
  'SW',
  'SE',
  'Beaverton',
  'Vancouver',
  'Clackamas',
  'Milwaukie'
);

create type category as enum (
	'restaurant',
	'attraction',
	'museum',
	'park',
	'indoor play',
	'toy store'
);

CREATE TYPE feature AS ENUM (
  'toys',
  'play area',
  'arcade',
  'quick service',
  'all ages',
  'comfortable seating',
  'friendly staff',
  'kids menu',
  'highchairs/boosters',
  'changing station',
  'flexible',
  'patio/sidewalk',
  'wildlife/nature',
  'stroller accessible',
  'rainy day fun'
);

CREATE TABLE places (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
  name TEXT NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL, 
  state TEXT NOT NULL,
  zipcode TEXT NOT NULL, 
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL, 
  neighborhood NEIGHBORHOOD NOT NULL, 
  hours json not null,
  phone VARCHAR(30) NOT NULL, 
  website TEXT NOT NULL,
  date_created DATE DEFAULT CURRENT_DATE NOT null,
  category category [] not null,
  descriptors text [] not null,
  features feature [] not null,
  images json not null
);

INSERT INTO places
  (name, address1, address2, city, state, zipcode, latitude, longitude, neighborhood, hours, phone, website, date_created, category, descriptors, features, images)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', null, 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', '[{"dayOfWeek": "Monday",
          "opens": "12:00 pm", "closes": "11:00 pm"}, {"dayOfWeek":"Tuesday", "opens":"12:00 pm", "closes":"11:00 pm"},
        {
          "dayOfWeek": "Wednesday",
          "opens": "12:00 pm",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "12:00 pm",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Friday",
          "opens": "12:00 pm",
          "closes": "12:00 am"
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "12:00 pm",
          "closes": "12:00 am"
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "12:00 pm",
          "closes": "11:00 pm"
        }
      ]', '503-232-3004', 'http://atlaspizzapdx.com', now(), '{"restaurant"}', '{"pizza", "arcade", "beer"}', '{"toys", "play area", "arcade", "quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}', '[
        {
          "id": 1,
          "src": "https://lh3.googleusercontent.com/ir83SjI1lJpHK4E5vQFwD7LfyE__eKaIvBtmFf1nV5wyfq-z5LVe4u7PuQvQ7ycqsFlGMe5vw3UNRB86G3SjLckIZKHgFSkz0-oQdLAAP2UxlUwq-HqDA116RjcI3iG-lA1ftsYr9S4=w2400",
          "title": "Jalapeno Popper pie",
          "place_id": 1
        },
        {
          "id": 2,
          "src": "https://lh3.googleusercontent.com/CjUvS4WgCiSRTsUUAryiPcczqAdyaSDhDg1ZTT6OrdgjfdNiTE5Q14pwI-C2m49tSjQHMnBxDgpiZyYZkxEDE3KzI3DWLsT631ROrF1zTuJcBqEXcRN8PP5U3EcG-bmMclE_uKmWh2E=w2400",
          "title": "A rainbow over Foster Blvd",
          "place_id": 1
        }
      ]'),
  ('Grand Central Bakery', '4412 SE Woodstock Blvd', null, 'Portland', 'OR', '97206', '45.479040', '-122.616120', 'SE', '[
        {
          "dayOfWeek": "Monday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Friday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "7:00 am",
          "closes": "6:00 pm"
        }
      ]', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now(), '{"restaurant"}', '{"cafe", "bakery", "pastries"}', '{"quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}', '[
        {
          "id": 1,
          "src": "https://lh3.googleusercontent.com/2-dLhEkgnU4-n62Nq4X1X2u5FjGRp5Hb5Wkwq1m1cuHbAqdJmrhih2MKdggGIncaWTMf3STdOGZgOMwaYa3nx1k6j2dA6Fs6kyys-i1yW2kw1jxG-Q9EmijXM0EosofSIpsTyoAdJns=w2400",
          "title": "Fresh loaf!",
          "place_id": 2
        },
        {
          "id": 2,
          "src": "https://lh3.googleusercontent.com/HDU-n0GE-3Glgn8o1WEDaRsUzhuA5qvLqoZjZzQCx1LwtOucN9zmWZ3YX_Lnce4_kp-sBcB8-6wXjiq9NjacD27tysnJt6eITsmlWGHj1WIRiCpLIzme95n-vK3ydgNBizXtHXTrkMY=w2400",
          "title": "A box of assorted pastries",
          "place_id": 2
        }
      ]'),
  ('Hopworks Urban Brewery: Powell', '2944 SE Powell Blvd', null, 'Portland', 'OR', '97206', '45.497010', '-122.635210', 'SE', '[
        {
          "dayOfWeek": "Monday",
          "opens": "11:00 am",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "11:00 am",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "11:00 am",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "11:00 am",
          "closes": "11:00 pm"
        },
        {
          "dayOfWeek": "Friday",
          "opens": "11:00 am",
          "closes": "12:00 am"
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "11:00 am",
          "closes": "12:00 am"
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "11:00 am",
          "closes": "11:00 pm"
        }
      ]', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now(), '{"restaurant"}', '{"pizza", "burgers", "beer"}', '{"toys", "play area", "all ages", "comfortable seating", "friendly staff", "kids menu", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}', '[
        {
          "id": 1,
          "src": "https://lh3.googleusercontent.com/7dA-7cI0-Ta-7QQ3k4ttgNuKjFNBhizMLXGF873v5nOWioblzEvWQn5r9HrZ4U13C31lZARcw3Yh6ZqiPX0hfqtRE9tpy3h9-toE9vf2QHDGd-355aLAWV5mOprQTJ0CybWQwO3zj-Y=w2400",
          "title": "Beer sampler",
          "place_id": 3
        },
        {
          "id": 2,
          "src": "https://lh3.googleusercontent.com/QsdaLX-XqlpIMZO2I1rv_pBubbRyxB2PHg4c2B-Pg2nSU0gV1Cgkbq759pKLU-ZleVam7r_Kh7DOiFjiCUlc6fzPFADGTgtlV73QeFk_0JUM_PAyaHFtn7b81p0QhjQIJjMfiaiKHNc=w2400",
          "title": "HUB exterior",
          "place_id": 3
        }
      ]'),
  ('Hammer and Jacks', '6416 SE Foster Rd', null, 'Portland', 'OR', '97206', '45.497560', '-122.611350', 'SE', '[
        {
          "dayOfWeek": "Monday",
          "opens": "10:00 am",
          "closes": "05:00 pm"
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "10:00 am",
          "closes": "05:00 pm"
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "10:00 am",
          "closes": "05:00 pm"
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "10:00 am",
          "closes": "05:00 pm"
        },
        {
          "dayOfWeek": "Friday",
          "opens": "10:00 am",
          "closes": "06:00 pm"
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "10:00 am",
          "closes": "06:00 pm"
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "10:00 am",
          "closes": "05:00 pm"
        }
      ]', '503-894-9150', 'https://www.hammerandjacks.com/', now(), '{"toy store", "indoor play"}', '{"toy store", "indoor play", "community space"}', '{"toys", "play area", "quick service", "comfortable seating", "friendly staff", "changing station", "flexible"}', '[
        {
          "id": 1,
          "src": "https://lh3.googleusercontent.com/t2wKP7xtx15nC8iSL6XGdR1oC5uYo6K8wxSFoC3LBBkVXlc7941TktpLLWV5VGmx_xFH0tCd-50qASnbtPXNtCo-xphQ16G33oZKeXLc-pRCe8wc5bnbpt-HqMqTsO3-7OmEI5t27EM=w2400",
          "title": "Hammer and Jacks storefront",
          "place_id": 4
        },
        {
          "id": 2,
          "src": "https://lh3.googleusercontent.com/gfamj0g-ieATA5fUX3ocTGlHAdKb-Bqrq-xm76mztNuWkijxGqREhE4htmH39rtUslLznfmLORL4ZMmN8tbKOd45z3izdHEfqHfX7MCKg86AWxFFba9XnmLYJIlaG-6oF0USXNrktEs=w2400",
          "title": "Unicorn party balloon!",
          "place_id": 4
        },
        {
          "id": 3,
          "src": "https://lh3.googleusercontent.com/mUsYElLLTLWoxwp5ydk9H-Z6prAG-92_NCzh3CS9xdbDqyr8RkOxnulQLmLUs-lZPtdzF3Vs9MB86qCvQXL_wPdkla3l15NkAlkHGYAbVx9yVKz-iuMh32n6pnK2iMSAxtvtvSXXoYk=w2400",
          "title": "Castle fort slide and indoor play area",
          "place_id": 4
        }
      ]'),
  ('Crystal Springs Rhododendron Garden', '5801 SE 28th Ave', null, 'Portland', 'OR', '97202', '45.480400', '-122.635399', 'SE', '[
        {
          "dayOfWeek": "Monday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Friday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "06:00 am",
          "closes": "10:00 pm"
        }
      ]', '503-771-8386', 'https://www.portlandoregon.gov/parks/finder/index.cfm?action=ViewPark&PropertyID=27', now(), '{"park", "attraction"}', '{"garden", "park", "wildlife"}', '{"all ages", "friendly staff", "patio/sidewalk", "wildlife/nature", "stroller accessible", "rainy day fun"}', '[
        {
          "id": 1,
          "src": "https://lh3.googleusercontent.com/CSSSQJ8V9mZ6jQwNCC1PMSaCimRjCjwxsKpyihqe5j57OWtVPkR3SNneSRiGZSbQy62Z1haz-p638MLFraVE_lgcZdsIeW4x_-r_JSziuRfof7-ztkteQ6cZvju0lvsYW8bvACKcfis=w2400",
          "title": "Pink rhododendrons in bloom",
          "place_id": 5
        },
        {
          "id": 2,
          "src": "https://lh3.googleusercontent.com/-bXD01_TzgdWhrKltvgPjK6a4YhpWY2jawymfmd4gKVcu869c4kJs-s2tlp5n_40rEDCYopM99TBDggJ0CVFI7Okx8b6TDtPsSswqY2S4v2DnMRq4e8SRYXcSyDnP8KNt3YY6zQvqb0=w2400",
          "title": "Ducks overlooking the garden",
          "place_id": 5
        },
        {
          "id": 3,
          "src": "https://lh3.googleusercontent.com/tn6yQ6erdO7uwlXXn3v7jXkDz6avzH84V1BUzZb1yEnDTIUWF-vnDkqEFWTBu-xxicSP3XLWPYPfs5Z7f-AKys4Lr0i8NcC8G7dgf3UH0RjlHr8axiGMbVs-LDbmuPokPZzyYLKSRpc=w2400",
          "title": "Garden path by the pond",
          "place_id": 5
        }
      ]');  
