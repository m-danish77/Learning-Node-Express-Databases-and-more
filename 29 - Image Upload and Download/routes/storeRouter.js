const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/store');

storeRouter.get('/', storeController.getHomes);
storeRouter.get('/home-list', storeController.getHomeList);
storeRouter.get('/home-list/:homeId', storeController.getHomeDetail);
storeRouter.post('/favourite-list', storeController.postAddToFavourite);
storeRouter.get('/favourite-list', storeController.getFavouriteList);
storeRouter.post(
  '/favourite-list/delete/:homeId',
  storeController.postRemoveFromFavourite,
);
storeRouter.get('/rules/:homeId', storeController.getHomeRules);
storeRouter.get('/bookings', storeController.getBookings);

module.exports = {
  storeRouter,
};
