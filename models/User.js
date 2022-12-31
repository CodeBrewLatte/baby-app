const mongoose = require("mongoose");

let User;

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
console.log("we hit the schema for a reason you know");

export const getUserModel = () => {
  console.log("USER IS COMING IN AS", User);
  if (!User) {
    User = mongoose.models.User || mongoose.model("User", userSchema);
  }

  return User;
};

//module.exports = mongoose.models.User || mongoose.model("User", userSchema);
