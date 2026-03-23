const { getDb } = require('../utils/db');
const { ObjectId } = require('mongodb');

class Favourite {
  static addToFavourites(homeId) {
    const db = getDb();
    // Use updateOne with upsert: true to avoid duplicate favorites
    return db
      .collection('favourites')
      .updateOne(
        { homeId: new ObjectId(homeId) },
        { $set: { homeId: new ObjectId(homeId), addedAt: new Date() } },
        { upsert: true },
      );
  }

  static getFavourites() {
    const db = getDb();
    return db.collection('favourites').find().toArray();
  }

  static removeFavourite(homeId) {
    const db = getDb();
    return db
      .collection('favourites')
      .deleteOne({ homeId: new ObjectId(homeId) });
  }
}

module.exports = Favourite;
