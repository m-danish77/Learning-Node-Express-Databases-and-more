// Firstly I make the current tab in Header bar active by using titlePage Logic in Partial/header.ejs using AI

// Then I add more fields in form-page.ejs
// then in hostRouter Push that new fields information in registeredHomes

// then finally in airbnb-main-page.ejs I show the new fields inthe form of card use ai for styling

// Dont want core Modules
// // Core modules
// const path = require("path");

// External modules
const express = require('express');

// local modules
const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
// Dont need
// const rootDir = require("./utils/pathUtil");

const app = express();

// Set the template engine to EJS
app.set('view engine', 'ejs');
// Tell Express where your templates are stored
// 'views' is the folder name
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

// "/host" is the common path for all hostRouters middleware
app.use('/host', hostRouter);

// This is for the addition of css files, css files will be in public folder to be accessible
// Dont need
// app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  // res.status(404) is a good practice otherwise browser will recieve it as a good and successful response with 200 sstatus code
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
