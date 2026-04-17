const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing connection');
    return;
  }
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log('MongoDb Connected');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
