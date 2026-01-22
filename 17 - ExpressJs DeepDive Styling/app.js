// I added css styling files in public folder link them with html files in views folder. I did this for only airbnb-main-page. in app2.js I add the below line to make public css files accesible.
// app.use(express.static(path.join(rootDir, "public")));

// Also i include cdn script of tailwind css in form-page.html and style that file.

// Core modules
const path = require('path');

// External modules
const express = require('express');

// local modules
const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

const app = express();

app.use(express.urlencoded());

app.use(userRouter);

// "/host" is the common path for all hostRouters middleware
app.use('/host', hostRouter);

// This is for the addition of css files, css files will be in public folder to be accessible
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  // res.status(404) is a good practice otherwise browser will recieve it as a good and successful response with 200 sstatus code
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
