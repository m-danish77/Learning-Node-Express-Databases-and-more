const express = require('express');
const hostRouter = express.Router();

const homesController = require('../controllers/homes');

// I remove the /host from both hostRouter.get and .post and add the common path in app2.js app.use("/host", hostRouter)
hostRouter.get('/add-home', homesController.getAddHome);
hostRouter.post('/add-home', homesController.postAddHome);

module.exports = {
  hostRouter,
};
