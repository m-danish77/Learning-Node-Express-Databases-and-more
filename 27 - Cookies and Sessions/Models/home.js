const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  description: String,
});

const Home = mongoose.model('homes', homeSchema);
module.exports = Home;
