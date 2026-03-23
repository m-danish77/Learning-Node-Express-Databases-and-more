const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/store');

storeRouter.get('/', storeController.getHomes);
storeRouter.get('/home-list', storeController.getHomeList);
storeRouter.get('/home-list/:homeId', storeController.getHomeDetail);
storeRouter.post('/favourite-list', storeController.postAddToFavourite);
storeRouter.get('/favourite-list', storeController.getFavouriteList);
storeRouter.get('/bookings', storeController.getBookings);

module.exports = {
  storeRouter,
};
