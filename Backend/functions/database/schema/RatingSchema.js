const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  mapID: {
    type: Number,
    required: false,
    unique: true,
  },
  userID: {
    type: Number,
    required: false,
    unique: true,
  },
  rate: {
    type: Number,
    required: false,
    unique: false,
    dafalt:0,
  },
});

const RatingModel = mongoose.model("Rating", RatingSchema);
module.exports = RatingModel;
