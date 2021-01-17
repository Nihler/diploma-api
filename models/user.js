const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
  },
  lastActivity: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);
