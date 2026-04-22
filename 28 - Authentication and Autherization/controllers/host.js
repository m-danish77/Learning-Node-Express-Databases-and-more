// import Home Class from Model home.js
const Home = require('../Models/home');
const User = require('../Models/user');

const getAddHome = (req, res, next) => {
  res.render('./host/edit-home', {
    pageTitle: 'Form Page',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

const postAddHome = async (req, res, next) => {
  // Using Destructuring here
  // it means i am doing the same like
  // const houseName = req.body['house-name'];
  const {
    'house-name': houseName,
    'price-per-night': pricePerNight,
    location,
    rating,
    'picture-url': pictureUrl,
    description,
  } = req.body;

  // making singleHome object from Home Class
  await Home.create({
    houseName: houseName,
    pricePerNight: pricePerNight,
    location: location,
    rating: rating,
    pictureUrl: pictureUrl,
    description: description,
  });
  res.redirect('/host/host-home-list');
};

// It shows the main page but with edit & delete button at every Home Card
const getHostHomeList = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render('./host/host-home-list', {
    registeredHomes: registeredHomes,
    pageTitle: 'Host Home List',
    isLoggedIn: req.isLoggedIn,
    user: req.user,
  });
};

const getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  const home = await Home.findById(homeId);
  if (!home) {
    console.log('Home not Found');
    return res.redirect('host/host-home-list');
  } else {
    res.render('host/edit-home', {
      home: home,
      pageTitle: 'Host Home List',
      isLoggedIn: req.isLoggedIn,
      editing: editing,
      user: req.user,
    });
  }
};

const postEditHome = async (req, res, next) => {
  const {
    'house-name': houseName,
    'price-per-night': pricePerNight,
    location,
    rating,
    'picture-url': pictureUrl,
    description,
    id,
  } = req.body;

  await Home.findByIdAndUpdate(id, {
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
    description,
  });
  res.redirect('/host/host-home-list');
};

const postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  await Home.findByIdAndDelete(homeId);
  // 2. The Clean Sweep:
  // Look at ALL users, find those who have this ID in their list, and $pull it.
  await User.updateMany(
    { favourites: homeId },
    { $pull: { favourites: homeId } },
  );
  res.redirect('/host/host-home-list');
};

module.exports = {
  getAddHome,
  postAddHome,
  getHostHomeList,
  getEditHome,
  postEditHome,
  postDeleteHome,
};
