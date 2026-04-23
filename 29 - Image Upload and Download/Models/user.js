const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already in use'],
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    // possible values 'guest' and 'host
    enum: ['guest', 'host'],
    default: 'guest',
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home', // Home Model Name
    },
  ],
});

// 'User' in mongoose.model('User', userSchema) is the model name. Mongoose automatically lowercase it pluralize it and make the collection for it in this case it is 'users' collection
const user = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = user;
