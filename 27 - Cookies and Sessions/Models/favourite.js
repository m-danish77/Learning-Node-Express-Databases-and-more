const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'homes', // collection name
  },
});

const Favourite = mongoose.model('Favourites', favouriteSchema);
module.exports = Favourite;
