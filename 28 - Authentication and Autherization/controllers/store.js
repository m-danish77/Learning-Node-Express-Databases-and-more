// import Home Class from Model home.js
const Home = require('../Models/home');
const User = require('../Models/user');

const getHomes = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render('./store/airbnb-main-page', {
    registeredHomes: registeredHomes,
    pageTitle: 'Airbnb Main Page',
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

const getHomeList = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render('./store/home-list', {
    registeredHomes: registeredHomes,
    pageTitle: 'Home List',
    isLoggedIn: req.isLoggedIn,
    user: req.user,
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
      user: req.user,
    });
  }
};

const postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  try {
    // First find the specific user form users collection by giving its req.user._id in the filter, now we find that user now we will modify that user favoutites field. $addToSet is like .push() in array but it is smarter it will not add duplicates
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { favourites: homeId },
    });
  } catch (e) {
    console.log(e.message);
  }

  res.redirect('/favourite-list');
};

const getFavouriteList = async (req, res, next) => {
  try {
    // in .populate('') we add the field name
    const user = await req.user.populate('favourites');
    const favouriteHomes = user.favourites;
    res.render('store/favourite-list', {
      favouriteHomes: favouriteHomes,
      pageTitle: 'Favourites List',
      isLoggedIn: req.isLoggedIn,
      user: req.user,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const user = req.user;
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((favId) => favId != homeId);
    await user.save();
  }
  res.redirect('/favourite-list');
};

const getBookings = (req, res, next) => {
  res.render('./store/bookings', {
    pageTitle: 'Bookings',
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

const getReserve = (req, res, next) => {
  res.render('./store/reserve', {
    pageTitle: 'Reserve',
    isLoggedIn: req.isLoggedIn,
    user: req.user,
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
