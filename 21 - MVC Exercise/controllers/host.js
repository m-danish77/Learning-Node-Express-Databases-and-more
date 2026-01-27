// import Home Class from Model home.js
const Home = require('../Models/home');

// const registeredHomes = [];

const getAddHome = (req, res, next) => {
  res.render('./host/form-page', { pageTitle: 'Form Page' });
};

const postAddHome = (req, res, next) => {
  // Using Destructuring here
  // it means i am doing the same like
  // const houseName = req.body['house-name'];
  console.log(req.body);
  const {
    'house-name': houseName,
    'price-per-night': pricePerNight,
    location,
    rating,
    'picture-url': pictureUrl,
  } = req.body;

  // making singleHome object from Home Class
  const singleHome = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
  );
  // Saving the singleHome object using method define in Home Class
  singleHome.save();

  // registeredHomes.push({
  //   houseName: req.body['house-name'],
  //   pricePerNight: req.body['price-per-night'],
  //   location: req.body.location,
  //   rating: req.body.rating,
  //   pictureUrl: req.body['picture-url'],
  // });
  res.render('./host/home-added', { pageTitle: 'Home Added' });
};

// It shows the main page but with edit & delete button at every Home Card
const getHostHomeList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('./host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Home List',
    });
  });
};

const getEditHome = (req, res, next) => {
  res.render('./host/edit-home', {
    pageTitle: 'Edit Home',
  });
};

module.exports = {
  getAddHome,
  postAddHome,
  getHostHomeList,
  getEditHome,
};
