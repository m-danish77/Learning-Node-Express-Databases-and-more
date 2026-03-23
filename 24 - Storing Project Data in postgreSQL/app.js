// Shifting Data from JSON to PostgreSQL

// install postgreSQL and then learn about it
// create a airbnb database and homes table (houseName, pricePerNight, location, rating, pictureUrl, description, id) and gives the data about the homes in the table. Use its primary key (id) as foreign key in favourites table

// then install package => npm install pg dotenv

// create a .env file to store the database connection details and then create a utils/db.js file to connect to the database and export a query function that can be used to execute SQL queries

// Add express.json() to the app.js file to parse incoming JSON data in the request body. This will allow you to handle POST requests that send JSON data to create new home listings or update existing ones in the database.

// Use that query function in the Home model to save and fetch data from the database instead of using JSON files. Update the controllers to use the new Home model methods that interact with the database.

// Make Favourites table in database with a constraint that if a home gets deleted its data or row in favourites table also get deleted

// "ADD CONSTRAINT favourites_id_fkey
// FOREIGN KEY (id)
// REFERENCES homes(id)
// ON DELETE CASCADE;"

// use same with favourite model to store the favourite homes in the database and update the controllers to use the new Favourite model methods that interact with the database.

const express = require('express');

// local modules
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { pageNotFound } = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(storeRouter);

// "/host" is the common path for all hostRouters middleware
app.use('/host', hostRouter);
app.use(pageNotFound);

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
