BEGIN;

TRUNCATE images, reviews, users, places, place_hours, category, place_category, descriptors, place_descriptors RESTART IDENTITY CASCADE;

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

INSERT INTO users
  (id, display_name, email, password, date_created)
VALUES
  (1, 'Administrator', 'administrator@xxx.com', '$2a$12$kkYIIV5RRTc1VnejrNYPjOtTOAixdpmHiS0AYOzmi13G3P6ko99Ei', '2019-07-06'),
  (2, 'Leah', 'leahawhite@gmail.com', '$2a$12$kkYIIV5RRTc1VnejrNYPjOtTOAixdpmHiS0AYOzmi13G3P6ko99Ei', '2019-07-06'),
  (3, 'Charlie', 'charlie@alwayssunny.com', '$2a$12$GSep0WnpEFTOdtkr74chKOKhHgd8Q5xCMed4QxEfYmED5MEpprGsi', '2019-06-13');

INSERT INTO reviews
  (rating, text, date_created, place_id, user_id)
VALUES
  (5, 'Atlas is our new favorite spot for a quick, painless dinner with our toddler. It''s super casual -- order slices or pies at the counter, and they call your name for pickup when it''s ready. Since it''s new, the play area is pretty clean and well-stocked. There''s an old church pew there for parents to sit and supervise, but the open floor plan means that you can see the play area from pretty much every table. We''ve only ordered slices, so we''ve never had to wait long. We''re usually in and out in 30 minutes, which is just about perfect for us.', '2019-06-13', 1, 2),
  (4, 'Very easy place to take kids of all ages. Nice toy area with a great variety of toys!', '2019-06-13', 1, 3),
  (4, 'There''s no play area with toys at this GCB location, but the sidewalk picnic tables are a bonus.', '2019-06-13', 2, 2),
  (4, 'HUB is pretty well known for being one of the kid-friendliest pubs in Portland, and they deliver. The food and beer are pretty good (including a kids'' menu), but we come for the play areas. There are two large separate play areas, one on each floor. One has a chalkboard, the other a train table, and many toys and books strewn between each. HUB also supplies coloring sheets and crayons. The wait can be long during peak hours, so we avoid weekends and try to go as close to 5:00 p.m. as possible.', '2019-07-06', 3, 2),
  (5, 'Hammer and Jacks is a wonderful toy store, play room, and community space. The price to use the play space ($5 or less with the punch card) is very reasonable, and the owner frequently switches up the toys so regulars don''t get too bored. We don''t come as often as we used to when he was a younger, wobblier toddler, but he still enjoys it when we do. The main feature of the room is a cleverly designed wooden castle structure with peekaboo windows, a runway of sorts that leads to a slide, and a carpeted tunnel underneath. There''s also a dressup chest and a stage of sorts for performing, plenty of vehicles, a play kitchen, a Magna-Tiles light table, and more. The big items in the toy store are a bit pricy for us (lots of European, indie and wooden toys), but we''ve picked up plenty of smaller items for under $20. The selection is always interesting and unique, and the owner is very warm and inviting.', '2019-07-08', 4, 2),
  (5, 'The rhodie garden is a park we can visit at any time of the year. It''s of course most beautiful in the spring with all of the flowers blooming, but it''s also fun to watch the ducks and splash in puddles on cold, rainy days. You can buy duck/geese food at the gate for $1/bag, though the birds are active enough without any encouragement. The paths are always well groomed and easy to walk on, even on the wettest days. With the water features, flowers, bridges, and wildlife, there''s plenty to see and do here.', '2019-07-10', 5, 2);

INSERT INTO images
  (id, src, title, place_id, user_id, date_created)
VALUES
  (1, 'https://lh3.googleusercontent.com/ir83SjI1lJpHK4E5vQFwD7LfyE__eKaIvBtmFf1nV5wyfq-z5LVe4u7PuQvQ7ycqsFlGMe5vw3UNRB86G3SjLckIZKHgFSkz0-oQdLAAP2UxlUwq-HqDA116RjcI3iG-lA1ftsYr9S4=w2400', 'Atlas Pizza''s ''Jalapeno Popper'' pie', 1, 1, '2019-06-13'),
  (2, 'https://lh3.googleusercontent.com/CjUvS4WgCiSRTsUUAryiPcczqAdyaSDhDg1ZTT6OrdgjfdNiTE5Q14pwI-C2m49tSjQHMnBxDgpiZyYZkxEDE3KzI3DWLsT631ROrF1zTuJcBqEXcRN8PP5U3EcG-bmMclE_uKmWh2E=w2400', 'A rainbow over Foster Blvd', 1, 1, '2019-06-13'),
  (3, 'https://lh3.googleusercontent.com/2-dLhEkgnU4-n62Nq4X1X2u5FjGRp5Hb5Wkwq1m1cuHbAqdJmrhih2MKdggGIncaWTMf3STdOGZgOMwaYa3nx1k6j2dA6Fs6kyys-i1yW2kw1jxG-Q9EmijXM0EosofSIpsTyoAdJns=w2400', 'Fresh loaf!', 2, 1, '2019-06-13'),
  (4, 'https://lh3.googleusercontent.com/HDU-n0GE-3Glgn8o1WEDaRsUzhuA5qvLqoZjZzQCx1LwtOucN9zmWZ3YX_Lnce4_kp-sBcB8-6wXjiq9NjacD27tysnJt6eITsmlWGHj1WIRiCpLIzme95n-vK3ydgNBizXtHXTrkMY=w2400', 'A box of assorted pastries', 2, 1, '2019-06-13'),
  (5, 'https://lh3.googleusercontent.com/7dA-7cI0-Ta-7QQ3k4ttgNuKjFNBhizMLXGF873v5nOWioblzEvWQn5r9HrZ4U13C31lZARcw3Yh6ZqiPX0hfqtRE9tpy3h9-toE9vf2QHDGd-355aLAWV5mOprQTJ0CybWQwO3zj-Y=w2400', 'Beer sampler', 3, 1, '2019-06-13'),
  (6, 'https://lh3.googleusercontent.com/QsdaLX-XqlpIMZO2I1rv_pBubbRyxB2PHg4c2B-Pg2nSU0gV1Cgkbq759pKLU-ZleVam7r_Kh7DOiFjiCUlc6fzPFADGTgtlV73QeFk_0JUM_PAyaHFtn7b81p0QhjQIJjMfiaiKHNc=w2400', 'HUB exterior', 3, 1, '2019-06-13'),
  (7, 'https://lh3.googleusercontent.com/t2wKP7xtx15nC8iSL6XGdR1oC5uYo6K8wxSFoC3LBBkVXlc7941TktpLLWV5VGmx_xFH0tCd-50qASnbtPXNtCo-xphQ16G33oZKeXLc-pRCe8wc5bnbpt-HqMqTsO3-7OmEI5t27EM=w2400', 'Hammer and Jacks storefront', 4, 1, '2019-06-13'),
  (8, 'https://lh3.googleusercontent.com/gfamj0g-ieATA5fUX3ocTGlHAdKb-Bqrq-xm76mztNuWkijxGqREhE4htmH39rtUslLznfmLORL4ZMmN8tbKOd45z3izdHEfqHfX7MCKg86AWxFFba9XnmLYJIlaG-6oF0USXNrktEs=w2400', 'Unicorn party balloon!', 4, 1, '2019-06-13'),
  (9, 'https://lh3.googleusercontent.com/mUsYElLLTLWoxwp5ydk9H-Z6prAG-92_NCzh3CS9xdbDqyr8RkOxnulQLmLUs-lZPtdzF3Vs9MB86qCvQXL_wPdkla3l15NkAlkHGYAbVx9yVKz-iuMh32n6pnK2iMSAxtvtvSXXoYk=w2400', 'Castle fort slide and indoor play area', 4, 1, '2019-06-13'),
  (10, 'https://lh3.googleusercontent.com/CSSSQJ8V9mZ6jQwNCC1PMSaCimRjCjwxsKpyihqe5j57OWtVPkR3SNneSRiGZSbQy62Z1haz-p638MLFraVE_lgcZdsIeW4x_-r_JSziuRfof7-ztkteQ6cZvju0lvsYW8bvACKcfis=w2400', 'Pink rhododendrons in bloom', 5, 1, '2019-06-13'),
  (11, 'https://lh3.googleusercontent.com/-bXD01_TzgdWhrKltvgPjK6a4YhpWY2jawymfmd4gKVcu869c4kJs-s2tlp5n_40rEDCYopM99TBDggJ0CVFI7Okx8b6TDtPsSswqY2S4v2DnMRq4e8SRYXcSyDnP8KNt3YY6zQvqb0=w2400', 'Ducks overlooking the garden', 5, 1, '2019-06-13'),
  (12, 'https://lh3.googleusercontent.com/tn6yQ6erdO7uwlXXn3v7jXkDz6avzH84V1BUzZb1yEnDTIUWF-vnDkqEFWTBu-xxicSP3XLWPYPfs5Z7f-AKys4Lr0i8NcC8G7dgf3UH0RjlHr8axiGMbVs-LDbmuPokPZzyYLKSRpc=w2400', 'Garden path by the pond', 5, 1, '2019-06-13'),
  (13, 'https://lh3.googleusercontent.com/QDwk6G6ZCwYzVH-yJHQ824GZ1wKW2XXus8hxxdH-4AAHz-FejC-UVydyE5le1ZvPTIo1cXw1G25qhljwS8dgyIedCCFtIxBonznVQ4LfaPDEZVWmqKS1vFqVUFFNmMmMlKQ5eCpfhNI=w2400', 'Atlas Pizza''s play area', 1, 2, '2019-07-06'),
  (14, 'https://lh3.googleusercontent.com/onV_ZZwQ1hbj_rqeAPM_B09jkj3Zc597V9BP2G2_43fexr570YJSrjhH2dkQJ8PEchSDgk8MPXcT_HC6R8-FJC2D4LHi9nuHYE6elMzmIbqm-tFsCL_qQSRsWBfdh0ZfDCQCIk560g8=w2400', 'Hi, greasy handprint. (Sorry, Atlas.)', 1, 2, '2019-07-06'),
  (15, 'https://lh3.googleusercontent.com/EsXFx4tHCGD6rT29rS7BLHwkqIDlr5Zp83oY6NGaQT36lbLdjmToppVmFXCntWRnEknaeEkPkMtiGgBihgGkDZBzcvPhVQUwwhHPdrXQGYKP4mIpktYDDg70WPewBPrj6rKrUYkw3YA=w2400', 'GCB cookies are the best!', 2, 2, '2019-07-06'),
  (16, 'https://lh3.googleusercontent.com/4jdEc5VGXsWFLqqeulTdHEnFXMISxcNJMikB-iUZvuU-_N9OaNFPwmsJi2xxptyIuN6GOFW5obNOyzEdbZ8GR0GPZOg14WSeqgJYtazOz1JYGLry6qdtW4ksCSwNNN_N-uPw0Zpy8xg=w2400', 'BRIO train set upstairs', 3, 2, '2019-07-06'),
  (17, 'https://lh3.googleusercontent.com/rTxUKWUh6FB0irUEViYVD28t-7o1iaEhiO4saV5T6HJHMcyKV-sBkKiBif7r0Rmj3W48OcmU2OY4zEPnB3lXDJ6q-qyWuqTfO0PWpn5V_bVkE23sdfmC_cOYEkyJFFhkIDq7EKxtQx8=w2400', 'Crayons and coloring sheets while you wait', 3, 2, '2019-07-06'),
  (18, 'https://lh3.googleusercontent.com/_QvxNBcamd3hHO7STXX_GOzoOlLnzl8FEwwWc2SQN4pjmVp4sBa-T1w86MWYTqXa8bcsO81itLMmDHtG_yZXS_Q06PTszZm3l4tISvj291hsuqHimqiJULOH1ZX9BdYaHGV6u76fMQI=w2400', 'Hustling across the bridge', 5, 2, '2019-07-06'),
  (19, 'https://lh3.googleusercontent.com/YagxcpA2XaaXHSdRnBrxfTEmhTTANSnc-o3qoP6nMDaJUv-wdFRjh2rbxxmbj7IvsKby_L64j2A_iyz2BLJUXEdtIOlb-AX9Srk5SHYJWb6H6gZmATzgxWYAkbABS9vIw2dArhokPNU=w2400', 'Water''s edge', 5, 2, '2019-07-06'),
  (20, 'https://lh3.googleusercontent.com/Y65KCP7rJQdp40AeXyGfKyKuVtjc4uK2LoVNQ2z9ok6IA7u8uKWzjPJOWCwEpBPsQtoD26k3tLgwP3uPx0PY4Mvk__yFh3QG_AXkruSKqnu2K7Yj3Qb2U6QgxV9jhH4VuTz7ZsOAhXM=w2400', 'Cherry blossom ''snow''', 5, 2, '2019-07-06');

COMMIT;