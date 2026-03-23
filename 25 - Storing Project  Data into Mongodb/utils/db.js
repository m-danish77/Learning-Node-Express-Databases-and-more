const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log('Connected to MongoDB Atlas');
      _db = client.db(process.env.DB_NAME);
      callback();
    })
    .catch((err) => {
      console.log('Error while connecting to MongoDB Atlas', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw new Error('No database found! Call mongoConnect first.');
};

module.exports = { mongoConnect, getDb };
