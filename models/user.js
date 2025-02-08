// userSchema
// Make the userSchema for schloarpedia

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Make the userSchema for schloarpedia
  // Add the following fields:
  // - username: String, required
  // - email: String, required
  // - password: String, required
  // - role: String, default: "user"
  // - createdAt: Date, default: Date.now
  // - updatedAt: Date, default: Date.now
  // - profile: Object, default: {}
  // - isVerified: Boolean, default: false
  // - verificationCode: String, default: null
  // - resetPasswordToken: String, default: null
  // - resetPasswordExpires: Date, default: null
  // - posts: Array, default: []
  // - comments: Array, default: []
  // - likes: Array, default: []
});

module.exports = mongoose.model("User", userSchema);
