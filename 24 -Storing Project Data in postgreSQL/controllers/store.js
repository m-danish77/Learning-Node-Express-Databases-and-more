// import Home Class from Model home.js & Favourite from Model favourite.js
const Home = require('../Models/home');
const Favourite = require('../Models/favourite');

const getHomes = (req, res, next) => {
  Home.fetchAll().then((result) => {
    const registeredHomes = result.rows;
    res.render('./store/airbnb-main-page', {
      registeredHomes: registeredHomes,
      pageTitle: 'Airbnb Main Page',
    });
  });
};

const getHomeList = (req, res, next) => {
  Home.fetchAll().then((result) => {
    const registeredHomes = result.rows;
    res.render('./store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Home List',
    });
  });
};

const getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((result) => {
    const home = result.rows[0];
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
  Favourite.addFavourite(homeId)
    .then(() => {
      res.redirect('/favourite-list');
    })
    .catch((err) => {
      console.log('Error adding to favorites:', err);
      res.redirect('/'); // Optional: redirect home if it fails
    });
};

const getFavouriteList = (req, res, next) => {
  // We call a single query that joins both tables
  Favourite.getFavourites()
    .then((result) => {
      const favouriteHomes = result.rows; // This is already filtered!
      res.render('./store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'Favourites List',
      });
    })
    .catch((err) => console.log(err));
};

const postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteFavourite(homeId).then(() => {
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
