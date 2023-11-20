const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Longitude: {
    type: Number,
    required: true,
  },
  Latitude: {
    type: Number,
    required: true,
  },
  Value: {
    type: Number,
    required: true,
    default: "#FFFFFF",
  },
});

const ScaleMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    required: true,
    unique: true,
  },
  Location: {
    type: [LocationSchema],
    required: false,
    unique: false,
  },
});

const ScaleMapSchema = mongoose.model("ScaleMap", ScaleMapSchema_);
module.exports = ScaleMapSchema;
