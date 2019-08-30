# Kid-Friendly PDX API

[Kid-Friendly PDX](https://github.com/leahawhite/kid-friendly-pdx) is a review and rating app that focuses on the kid-friendliness of places in Portland, Oregon. This is the API that serves and stores all data for the app.

## Server is hosted on Heroku:

[https://tranquil-caverns-98511.herokuapp.com/](https://tranquil-caverns-98511.herokuapp.com/)

## API Endpoints
Users
- POST '/api/users' creates a new user

Auth
- POST '/api/login' matches given credentials and provides a JWT token

Places
- GET '/api/places' gets all places in the database
  - Query parameters
    - searchTerm: searches places by place names, category, and descriptors based on user keyword
    - category: filters places by predefined category keyword
    - neighborhood: filters places by predefined neighborhood keyword
- GET '/api/places/:place_id' gets a place by ID
- GET '/api/places/:place_id/reviews' gets all reviews for a place, including review images

Reviews
- POST '/api/reviews' creates a new review

Images
- POST '/api/images/upload' uploads images to a Cloudinary server for transformation
- POST '/api/images' posts a new image to the database

## Technology Used
- Node.js
- Express
- PostgreSQL
- Knex.js
- Mocha
- Chai
- Supertest

## Security
This application uses JWT authentication.




