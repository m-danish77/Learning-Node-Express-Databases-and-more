const db = require('../utils/db');

const Favourite = class Favourite {
  static async addFavourite(homeId) {
    const result = await db.query('SELECT id FROM favourites WHERE id = $1', [
      homeId,
    ]);

    // 2. Check if any rows were returned
    if (result.rows.length > 0) {
      console.log('Home is already added to favourites.');
      return;
    } else {
      // 3. Insert if not found
      return db.query('INSERT INTO favourites(id) VALUES($1)', [homeId]);
    }
  }

  static getFavourites() {
    return db.query(
      'SELECT homes.* FROM homes INNER JOIN favourites ON homes.id = favourites.id',
    );
  }

  static deleteFavourite(homeId) {
    return db.query(`delete from favourites where id=$1`, [homeId]);
  }
};

module.exports = Favourite;
