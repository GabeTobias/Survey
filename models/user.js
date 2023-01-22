const { model, Schema } = require('mongoose');

const User = new Schema({
  Email: {
    type: String,
    require: true,
    unique: true
  },
  Password: {
    type: String,
    require: true,
  }
});

module.exports = {
  User: model('users', User)
};