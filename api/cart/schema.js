const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: String,
  desc: String,
  //   createDate: Date,
  //   updateDate: Date,
});
module.exports = mongoose.model("Item", ItemSchema);
