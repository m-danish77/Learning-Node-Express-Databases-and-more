// // Core modules
// const path = require("path");

const express = require("express");
const userRouter = express.Router();

// local module
// const rootDir = require("../utils/pathUtil");
const { registeredHomes } = require("../routes/hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render("airbnb-main-page", {
    registeredHomes: registeredHomes,
    pageTitle: "Airbnb Main Page",
  });
});

module.exports = {
  userRouter,
};
