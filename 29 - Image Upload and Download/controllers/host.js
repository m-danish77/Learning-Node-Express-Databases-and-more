// Core Modules
const fs = require('fs');
const path = require('path');

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
    description,
  } = req.body;

  // Server side error handling and type checking of image extensions
  if (!req.files) {
    return res.send(
      '<h1><center>Upload Image of supported file extensions only jpg, jpeg, and png are allowed</center></h1>',
    );
  }

  const picture = req.files['picture'] ? req.files['picture'][0].path : null;
  const rules = req.files['rules'] ? req.files['rules'][0].path : null;

  // making singleHome object from Home Class
  await Home.create({
    houseName: houseName,
    pricePerNight: pricePerNight,
    location: location,
    rating: rating,
    picture: picture,
    rules: rules,
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
    description,
    id,
  } = req.body;

  const updatedData = {
    houseName,
    pricePerNight,
    location,
    rating,
    description,
    id,
  };

  const oldHome = await Home.findById(id);
  if (!oldHome) {
    return res.redirect('/');
  }

  if (req.files && req.files['picture']) {
    if (oldHome.picture) {
      // 2. Delete the old file from the 'uploads' folder
      // We use path.join to make sure it works on both Windows and Linux
      const oldPath = path.join(__dirname, '..', oldHome.picture);
      fs.unlink(oldPath, (err) => {
        if (err) console.log('File deletion failed (it might not exist):', err);
      });
    }
    updatedData.picture = req.files['picture'][0].path;
  }

  if (req.files && req.files['rules']) {
    if (oldHome.rules) {
      // 2. Delete the old file from the 'rules' folder
      const oldPath = path.join(__dirname, '..', oldHome.rules);
      fs.unlink(oldPath, (err) => {
        if (err) console.log('File deletion failed (it might not exist):', err);
      });
    }
    updatedData.rules = req.files['rules'][0].path;
  }

  await Home.findByIdAndUpdate(id, updatedData);
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
