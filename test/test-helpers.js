const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

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
      ]
    }
  ]
}

function makeHoursArray() {
  [
    {
      "id": 1,
      "dayOfWeek": "Monday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": 1
    },
    {
      "id": 2,
      "dayOfWeek": "Tuesday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": 1
    },
    {
      "id": 3,
      "dayOfWeek": "Wednesday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": 1
    },
    {
      "id": 4,
      "dayOfWeek": "Thursday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": 1
    },
    {
      "id": 5,
      "dayOfWeek": "Friday",
      "opens": "12:00 pm",
      "closes": "12:00 am",
      "place_id": 1
    },
    {
      "id": 6,
      "dayOfWeek": "Saturday",
      "opens": "12:00 pm",
      "closes": "12:00 am",
      "place_id": 1
    },
    {
      "id": 7,
      "dayOfWeek": "Sunday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": 1
    },
    {
      "id": 8,
      "dayOfWeek": "Monday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 9,
      "dayOfWeek": "Tuesday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 10,
      "dayOfWeek": "Wednesday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 11,
      "dayOfWeek": "Thursday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 12,
      "dayOfWeek": "Friday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 13,
      "dayOfWeek": "Saturday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 14,
      "dayOfWeek": "Sunday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": 2
    },
    {
      "id": 15,
      "dayOfWeek": "Monday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": 3
    },
    {
      "id": 16,
      "dayOfWeek": "Tuesday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": 3
    },
    {
      "id": 17,
      "dayOfWeek": "Wednesday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": 3
    },
    {
      "id": 18,
      "dayOfWeek": "Thursday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": 3
    },
    {
      "id": 19,
      "dayOfWeek": "Friday",
      "opens": "11:00 am",
      "closes": "12:00 am",
      "place_id": 3
    },
    {
      "id": 20,
      "dayOfWeek": "Saturday",
      "opens": "11:00 am",
      "closes": "12:00 am",
      "place_id": 3
    },
    {
      "id": 21,
      "dayOfWeek": "Sunday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": 3
    }
  ]
}

function makeImagesArray(users, places) {
  return [
    {
      "id": 1,
      "src": "https://lh3.googleusercontent.com/ir83SjI1lJpHK4E5vQFwD7LfyE__eKaIvBtmFf1nV5wyfq-z5LVe4u7PuQvQ7ycqsFlGMe5vw3UNRB86G3SjLckIZKHgFSkz0-oQdLAAP2UxlUwq-HqDA116RjcI3iG-lA1ftsYr9S4=w2400",
      "title": "A pizza",
      "place_id": places[0].id,
      "user_id": users[0].id,
      "date_added": new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }) 
    },
    {
      "id": 2,
      "src": "https://lh3.googleusercontent.com/CjUvS4WgCiSRTsUUAryiPcczqAdyaSDhDg1ZTT6OrdgjfdNiTE5Q14pwI-C2m49tSjQHMnBxDgpiZyYZkxEDE3KzI3DWLsT631ROrF1zTuJcBqEXcRN8PP5U3EcG-bmMclE_uKmWh2E=w2400",
      "title": "A rainbow",
      "place_id": places[0].id,
      "user_id": users[0].id,
      "date_added": new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }) 
    },
    {
      "id": 3,
      "src": "https://lh3.googleusercontent.com/2-dLhEkgnU4-n62Nq4X1X2u5FjGRp5Hb5Wkwq1m1cuHbAqdJmrhih2MKdggGIncaWTMf3STdOGZgOMwaYa3nx1k6j2dA6Fs6kyys-i1yW2kw1jxG-Q9EmijXM0EosofSIpsTyoAdJns=w2400",
      "title": "Bread",
      "place_id": places[1].id,
      "user_id": users[0].id,
      "date_added": new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }) 
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
  const testHours = makeHoursArray()
  const testImages = makeImagesArray(testPlaces, testUsers)
  const testReviews = makeReviewsArray(testUsers, testPlaces)
  return { testUsers, testPlaces, testHours, testImages, testReviews }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
    `TRUNCATE
      places,
      place_hours,  
      users,
      images,
      reviews
      RESTART IDENTITY CASCADE`
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE places_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE place_hours_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE reviews_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('places_id_seq', 0)`),
        trx.raw(`SELECT setval('place_hours_id_seq', 0)`),
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

function seedPlacesTables(db, users, places, place_hours=[], images=[], reviews=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('places').insert(places)
    // await trx.into('places').insert(place_hours) (how to do this?)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('places_id_seq', ?)`,
      [places[places.length - 1].id]
    )
    // only insert reviews if there are some, also update sequence count
    if (reviews.length) {
      await trx.into('reviews').insert(reviews)
      await trx.raw(
        `SELECT setval('reviews_id_seq', ?)`,
        [reviews[reviews.length - 1].id],
      )
    }
    if (images.length) {
      await trx.into('images').insert(images)
    }
  })
}

function makeExpectedPlace(place, place_hours=[], images=[], reviews=[]) {
  const placeHours = place_hours
    .filter(place => place_hours.place_id === place.id)
  const placeReviews = reviews
    .filter(review => review.place_id === place.id)
  const placeImages = images
    .filter(image => image.place_id === place.id)
  const number_of_reviews = placeReviews.length
  const average_review_rating = calculateAverageReviewRating(placeReviews)
  return {
    id: place.id,
    name: place.name,
    address: place.address,
    city: place.city,
    state: place.state,
    zipcode: place.zipcode,
    latitude: place.latitude,
    longitude: place.longitude,
    neighborhood: place.neighborhood,
    hours: placeHours,
    phone: place.phone,
    website: place.website,
    date_added: new Date(place.date_added),
    category: place.category,
    descriptors: place.descriptors,
    features: place.features,
    reviews: placeReviews,
    number_of_reviews,
    average_review_rating,
    images: placeImages
  }
}

function makeExpectedPlaceImages(users, placeId, images) {
  const expectedImages = images
    .filter(image => image.place_id === placeId)

  return expectedImages.map(image => {
    const imageUser = users.find(user => user.id === image.user_id)
    return {
      id: image.id,
      src: image.src,
      title: image.title,
      date_added: moment(image.date_added).toISOString(true),
      place_id: image.place_id,
      user: {
        id: imageUser.id,
        display_name: imageUser.display_name,
      }
    }
  })
}

function makeExpectedPlaceReviews(users, placeId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.place_id === placeId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      rating: review.rating,
      text: review.text,
      date_created: moment(review.date_created).toISOString(true),
      place_id: review.place_id,
      user: {
        id: reviewUser.id,
        display_name: reviewUser.display_name,
      }
    }
  })
}

function calculateAverageReviewRating(reviews) {
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: 'HS256',
  }) 
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makePlacesArray,
  makeHoursArray,
  makeImagesArray,
  makeReviewsArray,
  
  makePlacesFixtures,
  seedUsers,
  seedPlacesTables,
  calculateAverageReviewRating,
  cleanTables,
  makeExpectedPlace,
  makeExpectedPlaceReviews,
  makeExpectedPlaceImages,
  makeAuthHeader
}