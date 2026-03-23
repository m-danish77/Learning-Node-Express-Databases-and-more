const db = require('../utils/db');

const Home = class Home {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
    description,
    id,
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.pictureUrl = pictureUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.query(
        `update homes
        set "houseName" = $1,
            "pricePerNight" = $2,
            location = $3,
            rating = $4,
            "pictureUrl" = $5,
            description = $6
        where id = $7
            `,
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.pictureUrl,
          this.description,
          this.id,
        ],
      );
    } else {
      return db.query(
        'INSERT INTO homes ("houseName", "pricePerNight", location, rating, "pictureUrl", description) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.pictureUrl,
          this.description,
        ],
      );
    }
  }

  static fetchAll() {
    // when we call fetchAll in the controllers it will return a promise
    return db.query('SELECT * FROM homes ORDER BY id ASC');
  }

  static findById(homeId) {
    return db.query('SELECT * FROM homes where id=$1', [homeId]);
  }

  static deleteHomeById(homeId) {
    return db.query('delete FROM homes where id=$1', [homeId]);
  }
};

module.exports = Home;
