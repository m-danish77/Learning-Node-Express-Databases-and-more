const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/store');

storeRouter.get('/', storeController.getHomes);
storeRouter.get('/bookings', storeController.getBookings);
storeRouter.get('/fovourite-list', storeController.getFavouriteList);
storeRouter.get('/home-detail', storeController.getHomeDetail);
storeRouter.get('/home-list', storeController.getHomeList);
storeRouter.get('/reserve', storeController.getReserve);

module.exports = {
  storeRouter,
};
