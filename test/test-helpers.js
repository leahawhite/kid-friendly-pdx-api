const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

function makeUsersArray() {
  return [
    {
      id: 1,
      display_name: 'test-user-1',
      email: 'test1@testing.com',
      password: 'password1',
      date_created: new Date('2019-07-06').toLocaleString('en', { timeZone: 'UTC' }),
    },
    {
      id: 2,
      display_name: 'test-user-2',
      email: 'test2@testing.com',
      password: 'password1',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
    },
    { 
      id: 3,
      display_name: 'test-user-3',
      email: 'test3@testing.com',
      password: 'password1',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
    },
  ]
}

function makePlacesArray() {
  return [
    {
      id: 1,
      name: 'Atlas Pizza',
      address: '6529 SE Foster Rd',
      city: 'Portland',
      state: 'OR',
      zipcode: '97206',
      latitude: 45.489200,
      longitude: -122.595070,
      neighborhood: 'SE',
      phone: '503-232-3004',
      website: 'http://atlaspizzapdx.com',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      features: [
        'toys', 
        'play area', 
        'arcade',
        'quick service'
      ]
    },
    {
      id: 2,
      name: 'Grand Central Bakery',
      address: '4412 SE Woodstock Blvd',
      city: 'Portland',
      state: 'OR',
      zipcode: '97206',
      latitude: 45.479040,
      longitude: -122.616120,
      neighborhood: 'SE',
      phone: '503-953-1250',
      website: 'https://www.grandcentralbakery.com/find-us/portland/woodstock/',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      features: [ 
        'quick service',
        'all ages',
        'comfortable seating'
      ]
    },
    {
      id: 3,
      name: 'Hopworks Urban Brewery: Powell',
      address: '2944 SE Powell Blvd',
      city: 'Portland',
      state: 'OR',
      zipcode: '97206',
      latitude: 45.497010,
      longitude: -122.635210,
      neighborhood: 'SE',
      phone: '503-232-4677',
      website: 'https://hopworksbeer.com/eat/powell/',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      features: [ 
        'toys', 
        'play area', 
        'all ages',
        'comfortable seating',
        'friendly staff'
      ]
    }
  ]
}

function makeHoursArray(places) {
  return [
    {
      id: 1,
      day_id: 1,
      opens: '12:00 pm',
      closes: '11:00 pm',
      place_id: places[0].id
    },
    {
      id: 2,
      day_id: 2,
      opens: '12:00 pm',
      closes: '11:00 pm',
      place_id: places[0].id
    },
    {
      id: 3,
      day_id: 3,
      opens: '12:00 pm',
      closes: '11:00 pm',
      place_id: places[0].id
    },
    {
      id: 4,
      day_id: 4,
      opens: '12:00 pm',
      closes: '11:00 pm',
      place_id: places[0].id
    },
    {
      id: 5,
      day_id: 5,
      opens: '12:00 pm',
      closes: '12:00 am',
      place_id: places[0].id
    },
    {
      id: 6,
      day_id: 6,
      opens: '12:00 pm',
      closes: '12:00 am',
      place_id: places[0].id
    },
    {
      id: 7,
      day_id: 7,
      opens: '12:00 pm',
      closes: '11:00 pm',
      place_id: places[0].id
    },
    {
      id: 8,
      day_id: 1,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 9,
      day_id: 2,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 10,
      day_id: 3,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 11,
      day_id: 4,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 12,
      day_id: 5,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 13,
      day_id: 6,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 14,
      day_id: 7,
      opens: '7:00 am',
      closes: '6:00 pm',
      place_id: places[1].id
    },
    {
      id: 15,
      day_id: 1,
      opens: '11:00 am',
      closes: '11:00 pm',
      place_id: places[2].id
    },
    {
      id: 16,
      day_id: 2,
      opens: '11:00 am',
      closes: '11:00 pm',
      place_id: places[2].id
    },
    {
      id: 17,
      day_id: 3,
      opens: '11:00 am',
      closes: '11:00 pm',
      place_id: places[2].id
    },
    {
      id: 18,
      day_id: 4,
      opens: '11:00 am',
      closes: '11:00 pm',
      place_id: places[2].id
    },
    {
      id: 19,
      day_id: 5,
      opens: '11:00 am',
      closes: '12:00 am',
      place_id: places[2].id
    },
    {
      id: 20,
      day_id: 6,
      opens: '11:00 am',
      closes: '12:00 am',
      place_id: places[2].id
    },
    {
      id: 21,
      day_id: 7,
      opens: '11:00 am',
      closes: '11:00 pm',
      place_id: places[2].id
    }
    ]
}

function makeCategoriesArray() {
  return  [ 
    { 
      id: 1,
      category_name: 'cat1'
    },
    { 
      id: 2,
      category_name: 'cat2'
    },
    { 
      id: 3,
      category_name: 'cat3'
    }
  ]
}

function makePlaceCategoriesArray(places, categories) {
  return [
    { 
      place_id: places[0].id,
      category_id: categories[0].id 
    },
    { 
      place_id: places[1].id,
      category_id: categories[1].id
    },
    { 
      place_id: places[2].id,
      category_id: categories[2].id 
    }
  ]
}

function makeDescriptorsArray() {
  return [
    {
      id: 1,
      descriptor: 'desc1'
    },
    {
      id: 2,
      descriptor: 'desc2'
    },
    {
      id: 3,
      descriptor: 'desc3'
    },
    {
      id: 4,
      descriptor: 'desc4'
    },
    {
      id: 5,
      descriptor: 'desc5'
    }
  ]
}

function makePlaceDescriptorsArray(places, descriptors) {
  return [
    {
      place_id: places[0].id,
      descriptor_id: descriptors[0].id
    },
    {
      place_id: places[0].id,
      descriptor_id: descriptors[1].id
    },
    {
      place_id: places[1].id,
      descriptor_id: descriptors[2].id
    },
    {
      place_id: places[1].id,
      descriptor_id: descriptors[3].id
    },
    {
      place_id: places[2].id,
      descriptor_id: descriptors[0].id
    },
    {
      place_id: places[2].id,
      descriptor_id: descriptors[4].id
    }
  ]
}

function makeReviewsArray(users, places) {
  return [
    { 
      id: 1,
      rating: 5,
      text: 'Test review 1',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[0].id,
      user_id: users[0].id,
    },
    { 
      id: 2,
      rating: 4,
      text: 'Test review 2',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      user_id: users[1].id,
    },
    { 
      id: 3,
      rating: 3,
      text: 'Test review 3',
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
      place_id: places[1].id,
      user_id: users[2].id,
    }
  ]
}

function makeImagesArray(users, places) {
  return [
    {
      id: "1",
      src: 'http://via.placeholder.com/640x360',
      title: 'A pizza',
      place_id: places[0].id,
      user_id: users[0].id,
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' })
    },
    {
      id: "2",
      src: 'http://via.placeholder.com/640x360',
      title: 'A rainbow',
      place_id: places[1].id,
      user_id: users[0].id,
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
    },
    {
      id: "3",
      src: 'http://via.placeholder.com/640x360',
      title: 'A loaf of bread',
      place_id: places[1].id,
      user_id: users[0].id,
      date_created: new Date('2019-06-13').toLocaleString('en', { timeZone: 'UTC' }),
    }
  ]
}
   
function makePlacesFixtures() {
  const testUsers = makeUsersArray()
  const testPlaces = makePlacesArray()
  const testHours = makeHoursArray(testPlaces)
  const testCategories = makeCategoriesArray()
  const testPlaceCategories = makePlaceCategoriesArray(testPlaces, testCategories)
  const testDescriptors = makeDescriptorsArray()
  const testPlaceDescriptors = makePlaceDescriptorsArray(testPlaces, testDescriptors)
  const testReviews = makeReviewsArray(testUsers, testPlaces)
  const testImages = makeImagesArray(testPlaces, testUsers)
  
  return { testUsers, testPlaces, testHours, testCategories, testPlaceCategories, testDescriptors, testPlaceDescriptors, testReviews, testImages }
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
      reviews,
      images
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
        trx.raw(`SELECT setval('category_id_seq', 0)`),
        trx.raw(`SELECT setval('descriptors_id_seq', 0)`),
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

function seedPlacesTables(db, users, places, hours, categories, placecategories, descriptors, placedescriptors, images=[], reviews=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('places').insert(places)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('places_id_seq', ?)`,
      [places[places.length - 1].id]
    )
    await trx.into('place_hours').insert(hours)
    await trx.raw(
      `SELECT setval('place_hours_id_seq', ?)`,
      [hours[hours.length - 1].id]
    )
    await trx.into('category').insert(categories)
    await trx.raw(
      `SELECT setval('category_id_seq', ?)`,
      [categories[categories.length - 1].id]
    )
    await trx.into('place_category').insert(placecategories)
    await trx.into('descriptors').insert(descriptors)
    await trx.raw(
      `SELECT setval('descriptors_id_seq', ?)`,
      [descriptors[descriptors.length - 1].id]
    )
    await trx.into('place_descriptors').insert(placedescriptors)
    
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

function makeExpectedPlace(place, users, hours, categories, placecategories, descriptors, placedescriptors, images=[], reviews=[]) {
  const placeHours = hours.filter(hour => hour.place_id === place.id)
  const placeCategs = placecategories.filter(placecat => placecat.place_id === 1)
  const namedCategories = placeCategs.map(placeCateg => 
    categories.filter(category => category.id === placeCateg.category_id)
    .map(cat => cat.category_name))
    .reduce((acc, val) => acc.concat(val), [])
  const placeDescripts = placedescriptors.filter(placedescriptor => placedescriptor.place_id === place.id)
  const namedDescriptors = placeDescripts.map(placeDescript => 
    descriptors.filter(descriptor => descriptor.id === placeDescript.descriptor_id)
    .map(desc => desc.descriptor))
    .reduce((acc, val) => acc.concat(val), [])
  const placeReviews = reviews && reviews.length && reviews.filter(review => review.place_id === place.id)
  const placeImages = images && images.length && images.filter(image => image.place_id === place.id)
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
    date_created: new Date(place.date_created),
    category: namedCategories,
    descriptors: namedDescriptors,
    features: place.features,
    reviews: placeReviews,
    number_of_reviews,
    average_review_rating,
    images: placeImages
  }
}

function makeExpectedPlaceReviews(users, placeId, reviews, images) {
  const expectedReviews = reviews
    .filter(review => review.place_id === placeId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    const reviewImages = images.filter(image => (image.place_id === review.place_id) && (image.user_id == review.user_id))
    return {
      id: review.id,
      rating: review.rating,
      text: review.text,
      date_created: new Date(review.date_created).toLocaleString(),
      place_id: review.place_id,
      user: {
        id: reviewUser.id,
        display_name: reviewUser.display_name,
      },
      images: reviewImages
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

function makeMaliciousReview() {
  const maliciousReview = {
    id: 911,
    rating: 5,
    text: 'Broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">.',
    place_id: 1,
    user_id: 1
  }
  const expectedReview = {
    ...makeExpectedReview(maliciousReview),
    text: 'Broken image <img src="https://url.to.file.which/does-not.exist">.',
  }
  return {
    maliciousReview,
    expectedReview,
  }
}

  
module.exports = {
  makeUsersArray,
  makePlacesArray,
  // makeHoursArray,
  // makeCategoriesArray,
  // makePlaceCategoriesArray,
  // makeDescriptorsArray,
  // makePlaceDescriptorsArray,
  makeReviewsArray,
  makeImagesArray,
  
  makePlacesFixtures,
  seedUsers,
  seedPlacesTables,
  calculateAverageReviewRating,
  cleanTables,
  makeExpectedPlace,
  makeExpectedPlaceReviews,
  makeAuthHeader,
  makeMaliciousReview
}