const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
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
    minLength: 8,
    maxLength: 16,
    required: true,
  },
  userlikes: { type: Number, default: 0 },
  about: { type: String },
  address: { type: String },
  gitlink: { type: String, default: '#' },
  title: { type: String },
  twitter: { type: String, default: '#' },
  weblink: { type: String, default: '#' },
  profile: { type: String, default: '' },
});

module.exports = mongoose.model('users', userSchema);
