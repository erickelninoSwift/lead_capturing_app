const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name must be provided"],
  },
  email: {
    type: String,
    require: [true, "email must be provided"],
  },
  phone: {
    type: Number,
    require: [true, "Phone number must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lead = mongoose.model("Lead", leadsSchema);
// const User = mongoose.model("User", userSchema);

module.exports = { Lead };
