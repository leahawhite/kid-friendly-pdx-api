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
  features feature [] not null
);

INSERT INTO places
  (name, address1, address2, city, state, zipcode, latitude, longitude, neighborhood, hours, phone, website, date_created, category, descriptors, features)
VALUES
  ('Atlas Pizza', '6529 SE Foster Rd', null, 'Portland', 'OR', '97206', '45.489200', '-122.595070', 'SE', 
  '[{
		"dayOfWeek": "Monday",
	    "opens": "12:00 pm", 
		"closes": "11:00 pm"
		}, 
	{
		"dayOfWeek":"Tuesday", 
		"opens":"12:00 pm", 
		"closes":"11:00 pm"
	},
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
      ]', '503-232-3004', 'http://atlaspizzapdx.com', now(), '{"restaurant"}', '{"pizza", "arcade", "beer"}', '{"toys", "play area", "arcade", "quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'), 
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
      ]', '503-953-1250', 'https://www.grandcentralbakery.com/find-us/portland/woodstock/', now(), '{"restaurant"}', '{"cafe", "bakery", "pastries"}', '{"quick service", "all ages", "comfortable seating", "friendly staff", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}'), 
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
      ]', '503-232-4677', 'https://hopworksbeer.com/eat/powell/', now(), '{"restaurant"}', '{"pizza", "burgers", "beer"}', '{"toys", "play area", "all ages", "comfortable seating", "friendly staff", "kids menu", "highchairs/boosters", "changing station", "flexible", "patio/sidewalk"}');  