// First we make a signup.ejs file and make routes for it both for get and post and their respective controllers for the get request and the post request.

//  Then in the post request controller, we validate the user input by a npm package name 'express-validator' and modify the singup.ejs file so it shows respective error messages if the validation fails.

// Before saving the user to the database (we make a User model that defines the schema for the user), we hash the user's password using a npm package name 'bcrypt' so it is stored securely in the database and then stored the user in the database.

// Now post Login, we validate the user input and check if the user exists in the database and if the password is correct (if it is not then we show an error message on the login page that 'Invalid email or password'). If the user is authenticated, we create a session (inside session we only store the user's id which is an ObjectId, by converting it to a string) and redirect the user to the home page.

// we add a middleware to the app.js that checks if the userId exists in the session and if it does we find the whole user by findById and store it in the request object.

// Then we pass the user in every render request so we can use it in the views. we done it so we can modify the Header on the basis of userType guest and host

// Then we delete the Favourite Model and then modify the user model to store favourites of every user inside the user itself. We modify the controllers everywhere where the Favourite Model was used

// Installed Npm Packages
const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

// Local Modules
const Home = require('./Models/home');
const User = require('./Models/user');
const connectDB = require('./utils/db');
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { authRouter } = require('./routes/authRouter');
const { pageNotFound } = require('./controllers/errors');

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
      maxAge: 5 * 24 * 60 * 60 * 1000, // How long the cookie stays active (e.g., 5 Days time is in the milliseconds).
      httpOnly: true, // Prevents JavaScript from reading the cookie (Security!).
    },
  }),
);

app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  User.findById(req.session.userId)
    .then((user) => {
      // Attach the actual Mongoose model to the request
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

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
