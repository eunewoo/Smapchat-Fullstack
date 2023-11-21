const mongoose = require("mongoose");

const RatingSchema_ = new mongoose.Schema({
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
    dafalt: 0,
  },
});

const RatingSchema = mongoose.model("Rating", RatingSchema_);
module.exports = RatingSchema;
