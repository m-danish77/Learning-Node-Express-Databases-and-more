// I want to use Dynamic UI for which i Nedd EJS Template engine

// i Install EJS Template Engine by using npm install --save ejs

// Create registerHomes array to store the registered homes in hostRouter and then pass it to userRouter by importing registeredHomes in userRouter, now we will use ejs to imbed Javascript in html

// After installing ejs we add 2 lines of code in app.js to tell that set deafult engine to ejs
// app.set("view engine", "ejs");
// app.set("views", "views");

// We change the res.sendFile to res.render for ejs to work in all places like userRouter, hostRouter and app.js.
// Give the respected variables or things we want in respective .ejs file in respective res.render

// then use ejs in airbnb-main-page.html change the .html to .ejs you can see the sytax by going in airbnb-main-page.ejs file

// Then do styling by using Tailwind css (use gemini for this).

// Then make a partials folder adjacent to the .ejs files inside that i can put the reuable code and can use that code in outer .ejs files by following the .ejs syntax
// <% include('partials/head.ejs') %>

// Dont want core Modules
// // Core modules
// const path = require("path");

// External modules
const express = require("express");

// local modules
const { userRouter } = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
// Dont need
// const rootDir = require("./utils/pathUtil");

const app = express();

// Set the template engine to EJS
app.set("view engine", "ejs");
// Tell Express where your templates are stored
// 'views' is the folder name
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

// "/host" is the common path for all hostRouters middleware
app.use("/host", hostRouter);

// This is for the addition of css files, css files will be in public folder to be accessible
// Dont need
// app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  // res.status(404) is a good practice otherwise browser will recieve it as a good and successful response with 200 sstatus code
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running at address http://localhost:3000");
});
