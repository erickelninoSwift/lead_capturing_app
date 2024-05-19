const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name must be provided"],
  },
  email: {
    type: String,
    require: [true, "email must be provided"],
  },
  password: {
    type: String,
    require: [true, "Phone number must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("Users", userSchema);
