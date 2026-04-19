// import Home Class from Model home.js & Favourite from Model favourite.js
const Home = require('../Models/home');
const Favourite = require('../Models/favourite');

const getHomes = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render('./store/airbnb-main-page', {
    registeredHomes: registeredHomes,
    pageTitle: 'Airbnb Main Page',
    isLoggedIn: req.isLoggedIn,
  });
};

const getHomeList = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render('./store/home-list', {
    registeredHomes: registeredHomes,
    pageTitle: 'Home List',
    isLoggedIn: req.isLoggedIn,
  });
};

const getHomeDetail = async (req, res, next) => {
  const homeId = req.params.homeId;
  const home = await Home.findById(homeId);
  if (!home) {
    res.redirect('/home-list');
  } else {
    res.render('./store/home-detail', {
      home: home,
      pageTitle: 'Home Detail',
      isLoggedIn: req.isLoggedIn,
    });
  }
};

const postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  try {
    const hello = await Favourite.findOneAndUpdate(
      { homeId: homeId },
      { homeId: homeId },
      { upsert: true, runValidators: true },
    );
  } catch (e) {
    console.log(e.message);
  }

  res.redirect('/favourite-list');
};

const getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.find().populate('homeId');
    const favouriteHomes = favourites.map((f) => f.homeId);

    res.render('store/favourite-list', {
      favouriteHomes: favouriteHomes,
      pageTitle: 'Favourites List',
      isLoggedIn: req.isLoggedIn,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  await Favourite.deleteOne({ homeId: homeId });
  res.redirect('/favourite-list');
};

const getBookings = (req, res, next) => {
  res.render('./store/bookings', {
    pageTitle: 'Bookings',
    isLoggedIn: req.isLoggedIn,
  });
};

const getReserve = (req, res, next) => {
  res.render('./store/reserve', {
    pageTitle: 'Reserve',
    isLoggedIn: req.isLoggedIn,
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
