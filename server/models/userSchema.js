const { default: mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    minLength: [5, "email is too short!"],
    maxLength: [50],
    required: true
  },
  name: {
    type: String,
    minLength: [2, "name is too short!"],
    maxLength: [46, "name length must be under 47"],
    required: true
  },
  dname: {
    type: String,
    minLength: [4, "username is too short!"],
    maxLength: [16, "username length must be under 17!"],
    required: true
  },
  password: { type: String, required: true },
  userlikes: { type: Number, default: 0 },
  about: { type: String },
  address: { type: String },
  gitlink: { type: String, default: "#" },
  title: { type: String },
  twitter: { type: String, default: "#" },
  weblink: { type: String, default: "#" },
  profile: { type: String, default: "" },
  otp: {
    type: String,
    minLength: [6, "Otp length must be 6"],
    maxLength: [6, "Otp length must be 6"]
  },
  isVerifiedEmail: { type: Boolean, default: false }
});

module.exports = mongoose.model("users", userSchema);
