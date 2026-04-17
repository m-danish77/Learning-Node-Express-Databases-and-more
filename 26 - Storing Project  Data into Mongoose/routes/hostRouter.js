const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/host');

// I remove the /host from both hostRouter.get and .post and add the common path in app2.js app.use("/host", hostRouter)
hostRouter.get('/add-home', hostController.getAddHome);

hostRouter.post('/add-home', hostController.postAddHome);

hostRouter.get('/host-home-list', hostController.getHostHomeList);

hostRouter.get('/edit-home/:homeId', hostController.getEditHome);

hostRouter.post('/edit-home', hostController.postEditHome);

hostRouter.post('/delete-home/:homeId', hostController.postDeleteHome);

module.exports = {
  hostRouter,
};
