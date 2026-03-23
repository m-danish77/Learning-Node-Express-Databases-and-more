const { getDb } = require('../utils/db');
const { ObjectId } = require('mongodb');

const Home = class Home {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    pictureUrl,
    description,
    _id,
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.pictureUrl = pictureUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      const updatedFields = {
        houseName: this.houseName,
        pricePerNight: this.pricePerNight,
        location: this.location,
        rating: this.rating,
        pictureUrl: this.pictureUrl,
        description: this.description,
      };
      return db
        .collection('homes')
        .updateOne({ _id: new ObjectId(this._id) }, { $set: updatedFields });
    }
    return db.collection('homes').insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDb();

    // Safety check: prevents BSONError if homeId is null, undefined, or wrong length
    if (!homeId || !ObjectId.isValid(homeId)) {
      console.log('Invalid ID format provided:', homeId);
      // We have to return a promise for the code in controller to work. Instead of making the controller wait for a database search that will fail anyway, you create a Promise that is already finished (resolved) and contains null.
      return Promise.resolve(null);
    }

    return db.collection('homes').findOne({ _id: new ObjectId(homeId) });
  }

  static deleteHomeById(homeId) {
    const db = getDb();

    // 1. Delete the home itself
    return db
      .collection('homes')
      .deleteOne({ _id: new ObjectId(homeId) })
      .then((result) => {
        // 2. Return the next promise so the controller waits for it
        return db
          .collection('favourites')
          .deleteMany({ homeId: new ObjectId(homeId) });
      });
  }
};

module.exports = Home;
