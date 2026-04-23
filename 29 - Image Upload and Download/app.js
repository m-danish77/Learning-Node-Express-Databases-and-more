// Adding a file picker in edit-home.ejs instead of pictureURL, and change the name from pictureURL to picture in the whole project, So the host can upload picture of home.

// Adding accept attribute in Add file picker so it can only accept image files.

// Adding enctype='multipart/form-data' in the form to make it compatibale in accepting files.

// Installed Npm package "multer" to recieve the image in the form of chunks. Use it in app.js in such a way that we can store the uploaded pictures with all distict names in 'uploads' folder and also add server side checking that user can only uploads images.

// now we will extract the picture seprately from the req.file and then in postAddHome save the home in database now the picture field has path inside it like picture: 'uploads/filename'

// In postEditHome we check if new file uploads then delete the previous uploaded image from the uploads folder using fs.unlink() if it uploads otherwise the previous image remain in db and in uploads folder.

// Now to actually show home images on the website for every home we make the uploads folder public in app.js

// we also want to add a home rules link for every home in home-details page and only the user who is logged in can download the pdfs for it we have to change many things.

// First we update the edit home page and add a file picker field for the home rules pdf upload

// then Update multer fileFilter, and distination in storage, change .single() in app.use(multer().single('picture')) to .fields([]) to support multiple file uploads.

// then we update the Home model to have a rules field that will store the path to the rules pdf and make a rules folder manually

// then we update the host controller postAddHome and postEditHome accordingly

// edit home-details.ejs to show the home rules pdf download link and define a route for it in storeRouter and its getHomeRules controller in storeController.js. Only logged in users should be able to download or view the pdfs.

// core modules
const path = require('path');

// External Modules
const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);
const multer = require('multer');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/home-list/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/rules', express.static(path.join(__dirname, 'uploads')));

function randomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const fileFilter = (req, file, cb) => {
  // Only accept image files (png, jpg, jpeg)
  if (file.fieldname == 'picture') {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      // Reject file with an error
      cb(null, false);
    }
  } else if (file.fieldname == 'rules') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      // Reject file with an error
      cb(null, false);
    }
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == 'picture') {
      cb(null, 'uploads');
    } else if (file.fieldname == 'rules') {
      cb(null, 'rules');
    } else {
      cb(null, 'others');
    }
  },
  filename: function (req, file, cb) {
    cb(null, randomString(10) + '-' + file.originalname);
  },
});

const multerOptions = multer({
  storage: storage,
  fileFilter: fileFilter,
});
app.use(
  multerOptions.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'rules', maxCount: 1 },
  ]),
);

const store = new mongoStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions',
});

app.use(
  session({
    name: 'Danish',
    secret: 'Hello World',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
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
