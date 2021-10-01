const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  address: {
    city: String,
    addr: String,
    ward: String,
    district: String,
  },
  phone: String,
});
module.exports = mongoose.model("User", UserSchema);
