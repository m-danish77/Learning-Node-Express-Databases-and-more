// Implement Session and Cookies in this chapter.

// We first use the cookies to know what are their limitations in implementing. Then we implement session with the help of express-session npm package.

// We use connect-mongodb-session npm package to store the session in MongoDB.

// All other important things are mentioned in comments with the specific features where they are implemented

// See app.js and routes folder and auth.js in controllers folder to see them.

const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { authRouter } = require('./routes/authRouter');
const { pageNotFound } = require('./controllers/errors');
const connectDB = require('./utils/db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(session()) Defines the secret, the storage (MongoDB), and cookie expiration. It dont creates the session. It initializes the capability to have sessions:
app.use(
  session({
    // the name of the cokkie created by express-session npm package. If I dont give any name then the default cookie name "session-sid" will be set

    name: 'Danish',

    // Express takes your Session ID (123) + your Secret (Hello World). It runs them through a formula to create a Signature (a long string of gibberish). It attaches that signature to the cookie.

    secret: 'Hello World',
    resave: false, // // Don't save the session back to the store if nothing changed. (Saves performance).
    saveUninitialized: false, // session is only saved when a person login
    store,
    cookie: {
      maxAge: 60 * 60 * 1000, // How long the cookie stays active (e.g., 1 hour time is in the milliseconds).
      httpOnly: true, // Prevents JavaScript from reading the cookie (Security!).
    },
  }),
);
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(authRouter);
app.use(storeRouter);
app.use('/host', (req, res, next) => {
  if (!req.isLoggedIn) {
    res.redirect('/');
  } else {
    next();
  }
});
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
