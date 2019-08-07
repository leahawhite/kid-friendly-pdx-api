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
      features: [
        "toys", 
        "play area", 
        "arcade",
        "quick service"
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
      features: [ 
        "quick service",
        "all ages",
        "comfortable seating"
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
      features: [ 
        "toys", 
        "play area", 
        "all ages",
        "comfortable seating",
        "friendly staff"
      ]
    }
  ]
}

function makeHoursArray(places) {
  [
    {
      "id": 1,
      "dayOfWeek": "Monday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": places[0]
    },
    {
      "id": 2,
      "dayOfWeek": "Tuesday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": places[0]
    },
    {
      "id": 3,
      "dayOfWeek": "Wednesday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": places[0]
    },
    {
      "id": 4,
      "dayOfWeek": "Thursday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": places[0]
    },
    {
      "id": 5,
      "dayOfWeek": "Friday",
      "opens": "12:00 pm",
      "closes": "12:00 am",
      "place_id": places[0]
    },
    {
      "id": 6,
      "dayOfWeek": "Saturday",
      "opens": "12:00 pm",
      "closes": "12:00 am",
      "place_id": places[0]
    },
    {
      "id": 7,
      "dayOfWeek": "Sunday",
      "opens": "12:00 pm",
      "closes": "11:00 pm",
      "place_id": places[0]
    },
    {
      "id": 8,
      "dayOfWeek": "Monday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 9,
      "dayOfWeek": "Tuesday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 10,
      "dayOfWeek": "Wednesday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 11,
      "dayOfWeek": "Thursday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 12,
      "dayOfWeek": "Friday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 13,
      "dayOfWeek": "Saturday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 14,
      "dayOfWeek": "Sunday",
      "opens": "7:00 am",
      "closes": "6:00 pm",
      "place_id": places[1]
    },
    {
      "id": 15,
      "dayOfWeek": "Monday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": places[2]
    },
    {
      "id": 16,
      "dayOfWeek": "Tuesday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": places[2]
    },
    {
      "id": 17,
      "dayOfWeek": "Wednesday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": places[2]
    },
    {
      "id": 18,
      "dayOfWeek": "Thursday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": places[2]
    },
    {
      "id": 19,
      "dayOfWeek": "Friday",
      "opens": "11:00 am",
      "closes": "12:00 am",
      "place_id": places[2]
    },
    {
      "id": 20,
      "dayOfWeek": "Saturday",
      "opens": "11:00 am",
      "closes": "12:00 am",
      "place_id": places[2]
    },
    {
      "id": 21,
      "dayOfWeek": "Sunday",
      "opens": "11:00 am",
      "closes": "11:00 pm",
      "place_id": places[2]
    }
  ]
}

function makeCategoryArray() { 
  [ 
    { 
      "id": 1,
      "category_name": "cat1"
    },
    { 
      "id": 2,
      "category_name": "cat2"
    },
    { 
      "id": 3,
      "category_name": "cat3"
    }
  ]
}

function makePlaceCategoryArray(places, category) {
  [
    { 
      "place_id": places[0],
      "category_id": 1 
    },
    { 
      "place_id": places[1],
      "category_id": 2 
    },
    { 
      "place_id": places[2],
      "category_id": 3 
    },
  ]
}

function makeDescriptorsArray() {
  [
    {
      "id": 1,
      "descriptor": "desc1"
    },
    {
      "id": 2,
      "descriptor": "desc2"
    },
    {
      "id": 3,
      "descriptor": "desc3"
    },
    {
      "id": 4,
      "descriptor": "desc4"
    },
    {
      "id": 5,
      "descriptor": "desc5"
    },
  ]
}

function makePlaceDescriptorsArray(places) {
  [
    {
      "place_id": places[0],
      "descriptor_id": 1
    },
    {
      "place_id": places[0],
      "descriptor_id": 2
    },
    {
      "place_id": places[1],
      "descriptor_id": 3
    },
    {
      "place_id": places[1],
      "descriptor_id": 4
    },
    {
      "place_id": places[2],
      "descriptor_id": 1
    },
    {
      "place_id": places[2],
      "descriptor_id": 5
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
      user_id: users[0].id,
    },
    { 
      id: 2,
      rating: 4,
      text: "Test review 2",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      user_id: users[1].id,
    },
    { 
      id: 3,
      rating: 3,
      text: "Test review 3",
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      user_id: users[2].id,
    },
  ]
}
   
function makePlacesFixtures() {
  const testUsers = makeUsersArray()
  const testPlaces = makePlacesArray()
  const testHours = makeHoursArray(testPlaces)
  const testCategory = makeCategoryArray()
  const testPlaceCategory = makePlaceCategoryArray(testPlaces)
  const testDescriptors = makeDescriptorsArray()
  const testPlaceDescriptors = makePlaceDescriptorsArray(testPlaces)
  const testImages = makeImagesArray(testPlaces, testUsers)
  const testReviews = makeReviewsArray(testUsers, testPlaces)
  return { testUsers, testPlaces, testHours, testCategory, testPlaceCategory, testDescriptors, testPlaceDescriptors, testImages, testReviews }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
    `TRUNCATE
      places,
      place_hours,
      category,
      place_category,
      descriptors,
      place_descriptors,  
      users,
      images,
      reviews
      RESTART IDENTITY CASCADE`
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE places_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE place_hours_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE category_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE descriptors_id_seq minvalue 0 START WITH 1`),
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

function seedPlacesTables(db, users, places, place_hours, category, place_category, descriptors, place_descriptors, images=[], reviews=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('places').insert(places)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('places_id_seq', ?)`,
      [places[places.length - 1].id]
    )
    /*await trx.into('place_hours').insert(place_hours)
    await trx.raw(
      `SELECT setval('place_hours_id_seq', ?)`,
      [place_hours[place_hours.length - 1].id]
    )
    await trx.into('category').insert(category)
    await trx.raw(
      `SELECT setval('category_id_seq', ?)`,
      [category[category.length - 1].id]
    )
    await trx.into('place_category').insert(place_category)
    await trx.into('descriptors').insert(descriptors)
    await trx.raw(
      `SELECT setval('descriptors_id_seq', ?)`,
      [descriptors[descriptors.length - 1].id]
    )
    await trx.into('place_descriptors').insert(place_descriptors)
    await trx.raw(
      `SELECT setval('descriptors_id_seq', ?)`,
      [descriptors[descriptors.length - 1].id]
    )*/
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

function makeExpectedPlace(place, users, place_hours, category, place_category, descriptors, place_descriptors, images=[], reviews=[]) {
  // how to do category and descriptor tests here?
  /*const placeHours = place_hours
    .filter(place_hours => place_hours.place_id === place.id)*/
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
    // hours: placeHours,
    phone: place.phone,
    website: place.website,
    date_added: new Date(place.date_added),
    // category: place.category,
    // descriptors: place.descriptors,
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

  return Number(sum / reviews.length).toFixed(2)
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
  makeCategoryArray,
  makePlaceCategoryArray,
  makeDescriptorsArray,
  makePlaceDescriptorsArray,
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