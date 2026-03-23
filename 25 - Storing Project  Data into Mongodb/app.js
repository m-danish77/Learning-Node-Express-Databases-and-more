// Move Backend to MongoDB

// In this section, we will refactor our backend to store project data in MongoDB instead of in-memory arrays. We will create a connection to MongoDB Atlas, define schemas for our data, and update our routes to interact with the database. This will allow us to persist data across server restarts and scale our application more effectively.

// Firstly we will set up a connection to MongoDB Atlas. We will create a utility file named db.js to handle the database connection and provide a way to access the database throughout our application. Then, we will update our Models  and Controllers to perform CRUD operations on the MongoDB collections. Finally, we will test our application to ensure that data is being stored and retrieved correctly from MongoDB.

const express = require('express');
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { pageNotFound } = require('./controllers/errors');
const { mongoConnect } = require('./utils/db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(storeRouter);
app.use('/host', hostRouter);
app.use(pageNotFound);

const PORT = process.env.PORT || 3000;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
