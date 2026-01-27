// import Home Class from Model home.js
const Home = require('../Models/home');

const getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('./store/airbnb-main-page', {
      registeredHomes: registeredHomes,
      pageTitle: 'Airbnb Main Page',
    });
  });
};

const getBookings = (req, res, next) => {
  res.render('./store/bookings', {
    pageTitle: 'Bookings',
  });
};

const getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('./store/favourite-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Favourites List',
    });
  });
};

const getHomeDetail = (req, res, next) => {
  res.render('./store/home-detail', {
    pageTitle: 'Home Detail',
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

const getReserve = (req, res, next) => {
  res.render('./store/reserve', {
    pageTitle: 'Reserve',
  });
};

module.exports = {
  getHomes,
  getBookings,
  getFavouriteList,
  getHomeDetail,
  getHomeList,
  getReserve,
};
