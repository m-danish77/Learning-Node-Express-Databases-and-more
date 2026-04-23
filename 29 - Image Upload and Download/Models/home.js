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
  picture: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
  description: String,
});
// 'Home' in mongoose.model('Home', homeSchema) is the model name. Mongoose automatically lowercase it pluralize it and make the collection for it in this case it is 'homes' collection
const Home = mongoose.models.Home || mongoose.model('Home', homeSchema);
module.exports = Home;
