// import Home Class from Model home.js & Favourite from Model favourite.js
const Home = require('../Models/home');
const Favourite = require('../Models/favourite');

const getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('./store/airbnb-main-page', {
      registeredHomes: registeredHomes,
      pageTitle: 'Airbnb Main Page',
    });
  });
};

const getHomeList = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('./store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Home List',
    });
  });
};

const getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect('/home-list');
    } else {
      res.render('./store/home-detail', {
        home: home,
        pageTitle: 'Home Detail',
      });
    }
  });
};

const postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourites(homeId).then(() => {
    res.redirect('/favourite-list');
  });
};

const getFavouriteList = (req, res, next) => {
  Favourite.getFavourites()
    .then((favs) => {
      // Extract just the IDs into an array
      const favIds = favs.map((f) => f.homeId);

      // Use $in operator to find all homes that match those IDs
      const db = require('../utils/db').getDb();
      return db
        .collection('homes')
        .find({ _id: { $in: favIds } })
        .toArray();
    })
    .then((favouriteHomes) => {
      res.render('store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'Favourites List',
      });
    });
};

const postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.removeFavourite(homeId).then(() => {
    console.log('Remove From Favourites');
    res.redirect('/favourite-list');
  });
};

const getBookings = (req, res, next) => {
  res.render('./store/bookings', {
    pageTitle: 'Bookings',
  });
};

const getReserve = (req, res, next) => {
  res.render('./store/reserve', {
    pageTitle: 'Reserve',
  });
};

module.exports = {
  getHomes,
  getHomeList,
  getHomeDetail,
  postAddToFavourite,
  getFavouriteList,
  postRemoveFromFavourite,
  getBookings,
  getReserve,
};
