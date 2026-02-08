// import Home Class from Model home.js & Favourite from Model favourite.js
const Home = require('../Models/home');
const Favourite = require('../Models/favourite');

const getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('./store/airbnb-main-page', {
      registeredHomes: registeredHomes,
      pageTitle: 'Airbnb Main Page',
    });
  });
};

const getHomeList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('./store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Home List',
    });
  });
};

const getHomeDetail = (req, res, next) => {
  const homeId = req.params;
  console.log(homeId);
  Home.findById(homeId, (home) => {
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
  Favourite.addFavourite(homeId, (err) => {
    if (err) {
      console.log('The error is: ', err);
    }

    // dont put res.redirect('/favourite-list') inside else because if error occurs in this case Home is already added to favourites and res.redirect() will not run
    res.redirect('/favourite-list');
  });
};

const getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    Favourite.getFavourites((favouriteIds) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home.id),
      );
      res.render('./store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'Favourites List',
      });
    });
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
  getBookings,
  getReserve,
};
