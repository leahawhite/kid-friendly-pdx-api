const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      display_name: "test-user-1",
      email: "test1@testing.com",
      password: "password1",
      date_created: new Date("2019-07-06").toLocaleString('en', { timeZone: 'UTC' }),
    },
    {
      id: 2,
      display_name: "test-user-2",
      email: "test2@testing.com",
      password: "password1",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
    },
    { 
      id: 3,
      display_name: "test-user-3",
      email: "test3@testing.com",
      password: "password1",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
    },
  ]
}

function makePlacesArray() {
  return [
    {
      id: 1,
      name: "Atlas Pizza",
      address: "6529 SE Foster Rd",
      city: "Portland",
      state: "OR",
      zipcode: "97206",
      latitude: 45.489200,
      longitude: -122.595070,
      neighborhood: "SE",
      phone: "503-232-3004",
      website: "http://atlaspizzapdx.com",
      date_added: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      category: [ "restaurant" ],
      descriptors: [ "pizza", "arcade", "beer" ],
      features: [
        "toys", 
        "play area", 
        "arcade",
        "quick service",
        "all ages",
        "comfortable seating",
        "friendly staff",
        "highchairs/boosters",
        "flexible",
        "patio/sidewalk"
      ],
      hours: [
        {
          "dayOfWeek": "Monday",
          "opens": "12:00 pm",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "12:00 pm",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "12:00 pm",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "12:00 pm",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Friday",
          "opens": "12:00 pm",
          "closes": "12:00 am",
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "12:00 pm",
          "closes": "12:00 am",
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "12:00 pm",
          "closes": "11:00 pm",
        }
      ]
    },
    {
      id: 2,
      name: "Grand Central Bakery",
      address: "4412 SE Woodstock Blvd",
      city: "Portland",
      state: "OR",
      zipcode: "97206",
      latitude: 45.479040,
      longitude: -122.616120,
      neighborhood: "SE",
      phone: "503-953-1250",
      website: "https://www.grandcentralbakery.com/find-us/portland/woodstock/",
      date_added: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      category: [ "restaurant" ],
      descriptors: [ "cafe", "bakery", "pastries" ],
      features: [ 
        "quick service",
        "all ages",
        "comfortable seating",
        "friendly staff",
        "highchairs/boosters",
        "changing station",
        "flexible",
        "patio/sidewalk"
      ],
      hours: [
        {
          "dayOfWeek": "Monday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Friday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "7:00 am",
          "closes": "6:00 pm",
        }
      ]
    },
    {
      id: 3,
      name: "Hopworks Urban Brewery: Powell",
      address: "2944 SE Powell Blvd",
      city: "Portland",
      state: "OR",
      zipcode: "97206",
      latitude: 45.497010,
      longitude: -122.635210,
      neighborhood: "SE",
      phone: "503-232-4677",
      website: "https://hopworksbeer.com/eat/powell/",
      date_added: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      category: [ "restaurant" ],
      descriptors: [ "pizza", "burgers", "beer"],
      features: [ 
        "toys", 
        "play area", 
        "all ages",
        "comfortable seating",
        "friendly staff",
        "kids menu",
        "highchairs/boosters",
        "changing station",
        "flexible",
        "patio/sidewalk"
      ],
      hours: [
        {
          "dayOfWeek": "Monday",
          "opens": "11:00 am",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Tuesday",
          "opens": "11:00 am",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Wednesday",
          "opens": "11:00 am",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Thursday",
          "opens": "11:00 am",
          "closes": "11:00 pm",
        },
        {
          "dayOfWeek": "Friday",
          "opens": "11:00 am",
          "closes": "12:00 am",
        },
        {
          "dayOfWeek": "Saturday",
          "opens": "11:00 am",
          "closes": "12:00 am",
        },
        {
          "dayOfWeek": "Sunday",
          "opens": "11:00 am",
          "closes": "11:00 pm",
        }
      ]
    }
  ]
}

function makeReviewsArray(users, places) {
  return [
    { 
      id: 1,
      rating: 5,
      text: "Test review 1",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[0].id,
      author: users[0].id,
    },
    { 
      id: 2,
      rating: 4,
      text: "Test review 2",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      author: users[1].id,
    },
    { 
      id: 3,
      rating: 3,
      text: "Test review 3",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      author: users[2].id,
    },
  ]
}
   
function makePlacesFixtures() {
  const testUsers = makeUsersArray()
  const testPlaces = makePlacesArray()
  const testReviews = makeReviewsArray(testUsers, testPlaces)
  return { testUsers, testPlaces, testReviews }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
    `TRUNCATE
      places,  
      users,
      reviews
      RESTART IDENTITY CASCADE`
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE places_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE reviews_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('places_id_seq', 0)`),
        trx.raw(`SELECT setval('users_id_seq', 0)`),
        trx.raw(`SELECT setval('reviews_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id]
      )
    )
}

function seedPlacesTables(db, users, places, reviews=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx. users)
    await trx.into('places').insert(places)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('places_id_seq', ?)`,
      [places[places.length - 1].id]
    )
    // only insert reviews if there are some, also update sequence count
  })
}


function makeAuthHeader(user) {
  const token = Buffer.from(`${user.email}:${user.password}`).toString('base64')
  return `Basic ${token}`
}

module.exports = {
  makeUsersArray,
  makePlacesArray,
  makeReviewsArray,
  
  makePlacesFixtures,
  seedUsers,
  seedPlacesTables,
  cleanTables,
  makeAuthHeader
}