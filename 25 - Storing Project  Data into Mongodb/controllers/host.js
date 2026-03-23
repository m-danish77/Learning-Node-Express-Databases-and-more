// import Home Class from Model home.js
const Home = require('../Models/home');
const Favourite = require('../Models/favourite');

// const registeredHomes = [];

const getAddHome = (req, res, next) => {
  res.render('./host/edit-home', {
    pageTitle: 'Form Page',
    editing: false,
  });
};

const postAddHome = (req, res, next) => {
  // Using Destructuring here
  // it means i am doing the same like
  // const houseName = req.body['house-name'];
  // console.log(req.body);
  const {
    'house-name': houseName,
    'price-per-night': pricePerNight,
    location,
    rating,
    'picture-url': pictureUrl,
    description,
  } = req.body;

  // making singleHome object from Home Class
  const singleHome = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
    description,
  );
  // Saving the singleHome object using method define in Home Class
  singleHome.save().then(() => {
    console.log('Home Saved Successfully');
  });
  res.redirect('/host/host-home-list');
};

// It shows the main page but with edit & delete button at every Home Card
const getHostHomeList = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('./host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Home List',
    });
  });
};

const getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log('Home not Found');
      return res.redirect('host/host-home-list');
    } else {
      res.render('host/edit-home', {
        home: home,
        pageTitle: 'Host Home List',
        editing: editing,
      });
    }
  });
};

const postEditHome = (req, res, next) => {
  const {
    'house-name': houseName,
    'price-per-night': pricePerNight,
    location,
    rating,
    'picture-url': pictureUrl,
    description,
    id,
  } = req.body;

  const singleHome = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
    description,
    id,
  );
  singleHome.save().then((result) => {
    console.log('Home updated ', result);
    res.redirect('/host/host-home-list');
  });
};

const postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteHomeById(homeId).then((home) => {
    res.redirect('/host/host-home-list');
  });
};

module.exports = {
  getAddHome,
  postAddHome,
  getHostHomeList,
  getEditHome,
  postEditHome,
  postDeleteHome,
};
