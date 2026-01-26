// // Core modules
// const path = require("path");

const express = require("express");
const hostRouter = express.Router();
// const rootDir = require("../utils/pathUtil");

// I remove the /host from both hostRouter.get and .post and add the common path in app2.js app.use("/host", hostRouter)
hostRouter.get("/add-home", (req, res, next) => {
  res.render("form-page", { pageTitle: "Form Page" });
});

const registeredHomes = [];
hostRouter.post("/add-home", (req, res, next) => {
  console.log("Registered Homes Are: ");
  registeredHomes.push({
    houseName: req.body["house-name"],
    pricePerNight: req.body["price-per-night"],
    location: req.body.location,
    rating: req.body.rating,
    pictureUrl: req.body["picture-url"],
  });
  res.render("home-added", { pageTitle: "Home Added" });
});

module.exports = {
  hostRouter,
  registeredHomes,
};
