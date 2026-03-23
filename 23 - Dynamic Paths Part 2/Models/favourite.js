const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

// // fake Database
// const registeredHomes = [];
const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

const Favourite = class Favourite {
  static addFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback('Home is already added to favourites.');
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      // console.log('File Read: ', err, data);

      if (err || !data || data.toString().trim() === '') {
        return callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static deleteFavourite(homeId, callback) {
    Favourite.getFavourites((homeIds) => {
      const homeDelete = homeIds.filter(
        (favouriteHomeId) => favouriteHomeId !== homeId,
      );
      fs.writeFile(favouriteDataPath, JSON.stringify(homeDelete), (err) => {
        if (!err) {
          callback();
        }
      });
    });
  }
};

module.exports = Favourite;
