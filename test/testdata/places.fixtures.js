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
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
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
        },
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
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
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
        },
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
      date_created: new Date("2019-06-13").toLocaleString('en', { timeZone: 'UTC' }),
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
        },
      ]
    }
  ]
}

module.exports = {
  makePlacesArray,
}