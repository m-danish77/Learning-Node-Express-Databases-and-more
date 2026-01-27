const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

// // fake Database
// const registeredHomes = [];

const Home = class Home {
  constructor(houseName, pricePerNight, location, rating, pictureUrl) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.pictureUrl = pictureUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'homes.json');
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.log('Write File Concluded', err);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      // console.log('File Read: ', err, data);

      // Same Logic as below
      callback(!err ? JSON.parse(data) : []);
      // if(!err){
      //   callback(JSON.parse(data));
      // }else{
      //   callback([]);
      // }
    });
  }
};

module.exports = Home;
