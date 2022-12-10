const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  sessionId: {
    type: Number,
    required: false,
  },
  entries: [],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
