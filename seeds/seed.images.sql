BEGIN;

TRUNCATE 
  images RESTART IDENTITY CASCADE;

INSERT INTO images
  (id, src, title, place_id, user_id, date_created, review_id)
VALUES
  (1, 'https://lh3.googleusercontent.com/ir83SjI1lJpHK4E5vQFwD7LfyE__eKaIvBtmFf1nV5wyfq-z5LVe4u7PuQvQ7ycqsFlGMe5vw3UNRB86G3SjLckIZKHgFSkz0-oQdLAAP2UxlUwq-HqDA116RjcI3iG-lA1ftsYr9S4=w2400', 'Atlas Pizza''s ''Jalapeno Popper'' pie', 1, 1, '2019-06-13', null),
  (2, 'https://lh3.googleusercontent.com/CjUvS4WgCiSRTsUUAryiPcczqAdyaSDhDg1ZTT6OrdgjfdNiTE5Q14pwI-C2m49tSjQHMnBxDgpiZyYZkxEDE3KzI3DWLsT631ROrF1zTuJcBqEXcRN8PP5U3EcG-bmMclE_uKmWh2E=w2400', 'A rainbow over Foster Blvd', 1, 1, '2019-06-13', null),
  (3, 'https://lh3.googleusercontent.com/2-dLhEkgnU4-n62Nq4X1X2u5FjGRp5Hb5Wkwq1m1cuHbAqdJmrhih2MKdggGIncaWTMf3STdOGZgOMwaYa3nx1k6j2dA6Fs6kyys-i1yW2kw1jxG-Q9EmijXM0EosofSIpsTyoAdJns=w2400', 'Fresh loaf!', 2, 1, '2019-06-13', null),
  (4, 'https://lh3.googleusercontent.com/HDU-n0GE-3Glgn8o1WEDaRsUzhuA5qvLqoZjZzQCx1LwtOucN9zmWZ3YX_Lnce4_kp-sBcB8-6wXjiq9NjacD27tysnJt6eITsmlWGHj1WIRiCpLIzme95n-vK3ydgNBizXtHXTrkMY=w2400', 'A box of assorted pastries', 2, 1, '2019-06-13', null),
  (5, 'https://lh3.googleusercontent.com/7dA-7cI0-Ta-7QQ3k4ttgNuKjFNBhizMLXGF873v5nOWioblzEvWQn5r9HrZ4U13C31lZARcw3Yh6ZqiPX0hfqtRE9tpy3h9-toE9vf2QHDGd-355aLAWV5mOprQTJ0CybWQwO3zj-Y=w2400', 'Beer sampler', 3, 1, '2019-06-13', null),
  (6, 'https://lh3.googleusercontent.com/QsdaLX-XqlpIMZO2I1rv_pBubbRyxB2PHg4c2B-Pg2nSU0gV1Cgkbq759pKLU-ZleVam7r_Kh7DOiFjiCUlc6fzPFADGTgtlV73QeFk_0JUM_PAyaHFtn7b81p0QhjQIJjMfiaiKHNc=w2400', 'HUB exterior', 3, 1, '2019-06-13', null),
  (7, 'https://lh3.googleusercontent.com/t2wKP7xtx15nC8iSL6XGdR1oC5uYo6K8wxSFoC3LBBkVXlc7941TktpLLWV5VGmx_xFH0tCd-50qASnbtPXNtCo-xphQ16G33oZKeXLc-pRCe8wc5bnbpt-HqMqTsO3-7OmEI5t27EM=w2400', 'Hammer and Jacks storefront', 4, 1, '2019-06-13', null),
  (8, 'https://lh3.googleusercontent.com/gfamj0g-ieATA5fUX3ocTGlHAdKb-Bqrq-xm76mztNuWkijxGqREhE4htmH39rtUslLznfmLORL4ZMmN8tbKOd45z3izdHEfqHfX7MCKg86AWxFFba9XnmLYJIlaG-6oF0USXNrktEs=w2400', 'Unicorn party balloon!', 4, 1, '2019-06-13', null),
  (9, 'https://lh3.googleusercontent.com/mUsYElLLTLWoxwp5ydk9H-Z6prAG-92_NCzh3CS9xdbDqyr8RkOxnulQLmLUs-lZPtdzF3Vs9MB86qCvQXL_wPdkla3l15NkAlkHGYAbVx9yVKz-iuMh32n6pnK2iMSAxtvtvSXXoYk=w2400', 'Castle fort slide and indoor play area', 4, 1, '2019-06-13', null),
  (10, 'https://lh3.googleusercontent.com/CSSSQJ8V9mZ6jQwNCC1PMSaCimRjCjwxsKpyihqe5j57OWtVPkR3SNneSRiGZSbQy62Z1haz-p638MLFraVE_lgcZdsIeW4x_-r_JSziuRfof7-ztkteQ6cZvju0lvsYW8bvACKcfis=w2400', 'Pink rhododendrons in bloom', 5, 1, '2019-06-13', null),
  (11, 'https://lh3.googleusercontent.com/-bXD01_TzgdWhrKltvgPjK6a4YhpWY2jawymfmd4gKVcu869c4kJs-s2tlp5n_40rEDCYopM99TBDggJ0CVFI7Okx8b6TDtPsSswqY2S4v2DnMRq4e8SRYXcSyDnP8KNt3YY6zQvqb0=w2400', 'Ducks overlooking the garden', 5, 1, '2019-06-13', null),
  (12, 'https://lh3.googleusercontent.com/tn6yQ6erdO7uwlXXn3v7jXkDz6avzH84V1BUzZb1yEnDTIUWF-vnDkqEFWTBu-xxicSP3XLWPYPfs5Z7f-AKys4Lr0i8NcC8G7dgf3UH0RjlHr8axiGMbVs-LDbmuPokPZzyYLKSRpc=w2400', 'Garden path by the pond', 5, 1, '2019-06-13', null),
  (13, 'https://lh3.googleusercontent.com/QDwk6G6ZCwYzVH-yJHQ824GZ1wKW2XXus8hxxdH-4AAHz-FejC-UVydyE5le1ZvPTIo1cXw1G25qhljwS8dgyIedCCFtIxBonznVQ4LfaPDEZVWmqKS1vFqVUFFNmMmMlKQ5eCpfhNI=w2400', 'Atlas Pizza''s play area', 1, 2, '2019-07-06', 1),
  (14, 'https://lh3.googleusercontent.com/onV_ZZwQ1hbj_rqeAPM_B09jkj3Zc597V9BP2G2_43fexr570YJSrjhH2dkQJ8PEchSDgk8MPXcT_HC6R8-FJC2D4LHi9nuHYE6elMzmIbqm-tFsCL_qQSRsWBfdh0ZfDCQCIk560g8=w2400', 'Hi, greasy handprint. (Sorry, Atlas.)', 1, 2, '2019-07-06', 1),
  (15, 'https://lh3.googleusercontent.com/EsXFx4tHCGD6rT29rS7BLHwkqIDlr5Zp83oY6NGaQT36lbLdjmToppVmFXCntWRnEknaeEkPkMtiGgBihgGkDZBzcvPhVQUwwhHPdrXQGYKP4mIpktYDDg70WPewBPrj6rKrUYkw3YA=w2400', 'GCB cookies are the best!', 2, 2, '2019-07-06', 3),
  (16, 'https://lh3.googleusercontent.com/4jdEc5VGXsWFLqqeulTdHEnFXMISxcNJMikB-iUZvuU-_N9OaNFPwmsJi2xxptyIuN6GOFW5obNOyzEdbZ8GR0GPZOg14WSeqgJYtazOz1JYGLry6qdtW4ksCSwNNN_N-uPw0Zpy8xg=w2400', 'BRIO train set upstairs', 3, 2, '2019-07-06', 4),
  (17, 'https://lh3.googleusercontent.com/rTxUKWUh6FB0irUEViYVD28t-7o1iaEhiO4saV5T6HJHMcyKV-sBkKiBif7r0Rmj3W48OcmU2OY4zEPnB3lXDJ6q-qyWuqTfO0PWpn5V_bVkE23sdfmC_cOYEkyJFFhkIDq7EKxtQx8=w2400', 'Crayons and coloring sheets while you wait', 3, 2, '2019-07-06', 4),
  (18, 'https://lh3.googleusercontent.com/_QvxNBcamd3hHO7STXX_GOzoOlLnzl8FEwwWc2SQN4pjmVp4sBa-T1w86MWYTqXa8bcsO81itLMmDHtG_yZXS_Q06PTszZm3l4tISvj291hsuqHimqiJULOH1ZX9BdYaHGV6u76fMQI=w2400', 'Hustling across the bridge', 5, 2, '2019-07-06', 6),
  (19, 'https://lh3.googleusercontent.com/YagxcpA2XaaXHSdRnBrxfTEmhTTANSnc-o3qoP6nMDaJUv-wdFRjh2rbxxmbj7IvsKby_L64j2A_iyz2BLJUXEdtIOlb-AX9Srk5SHYJWb6H6gZmATzgxWYAkbABS9vIw2dArhokPNU=w2400', 'Water''s edge', 5, 2, '2019-07-06', 6),
  (20, 'https://lh3.googleusercontent.com/Y65KCP7rJQdp40AeXyGfKyKuVtjc4uK2LoVNQ2z9ok6IA7u8uKWzjPJOWCwEpBPsQtoD26k3tLgwP3uPx0PY4Mvk__yFh3QG_AXkruSKqnu2K7Yj3Qb2U6QgxV9jhH4VuTz7ZsOAhXM=w2400', 'Cherry blossom ''snow''', 5, 2, '2019-07-06', 6);

COMMIT;