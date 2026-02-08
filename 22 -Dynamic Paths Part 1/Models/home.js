const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

// // fake Database
// const registeredHomes = [];
const homeDataPath = path.join(rootDir, 'data', 'homes.json');
const favouriteDataPath = path.join(rootDir, 'data', 'homes.json');

const Home = class Home {
  constructor(houseName, pricePerNight, location, rating, pictureUrl) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.pictureUrl = pictureUrl;
  }

  save() {
    this.id = Math.floor(Math.random() * 100000000).toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.log('Write File Concluded', err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      // console.log('File Read: ', err, data);

      if (err || !data || data.toString().trim() === '') {
        return callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};

module.exports = Home;
