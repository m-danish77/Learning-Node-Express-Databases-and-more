// Core modules
const path = require('path');

const express = require('express');
const hostRouter = express.Router();
const rootDir = require('../utils/pathUtil');

// I remove the /host from both hostRouter.get and .post and add the common path in app2.js app.use("/host", hostRouter)
hostRouter.get('/add-home', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'form-page.html'));
});

hostRouter.post('/add-home', (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'home-added.html'));
});

module.exports = {
  hostRouter,
};
