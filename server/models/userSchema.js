const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    minLength: [5, 'email is not valid!'],
    required: true,
  },
  name: {
    type: String,
    minLength: [2, 'name is too short!'],
    maxLength: 46,
    required: true,
  },
  dname: {
    type: String,
    minLength: [4, 'username is too short!'],
    maxLength: 36,
    required: true,
  },
  password: {
    type: String,
    minLength: [8, 'Password length must be between 8 to 16'],
    maxLength: [16, 'Password length must be between 8 to 16'],
    required: true,
  },
  userlikes: { type: Number, default: 0 },
  about: { type: String },
  address: { type: String },
  gitlink: { type: String, default: '#' },
  title: { type: String },
  twitter: { type: String, default: '#' },
  weblink: { type: String, default: '#' },
  profile: { type: String, default: null },
});

module.exports = mongoose.model('users', userSchema);