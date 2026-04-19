// Move backend to Mongoose

// First build a connection to the database by writing code in db.js and then using it in app.js.

// change the Home and Favourite Model and add Mongoose schema validation for both then use them in respective controllers functions

// Use the Mongoose References to link the Home and Favourite models together. Use the populate method to retrieve the related data when needed. This will allow you to easily access the related data without having to write complex queries.

const express = require('express');
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { pageNotFound } = require('./controllers/errors');
const connectDB = require('./utils/db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(storeRouter);
app.use('/host', hostRouter);
app.use(pageNotFound);

const PORT = 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
