const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  baby: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  sesh: {
    type: Number,
    required: false,
  },
  entries: [],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

//module.exports = mongoose.models.User || mongoose.model("User", userSchema);
