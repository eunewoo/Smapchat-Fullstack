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
  Lattitude: {
    type: Number,
    required: true,
  },
  Value: {
    type: Number,
    required: true,
  },
});

const ScaleMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    unique: true,
    required: true,
    default: 0,
  },
  Location: {
    type: [LocationSchema],
    required: false,
    unique: false,
  },
  MinColor: {
    type: String,
    required: false,
    unique: false,
  },
  MaxColor: {
    type: String,
    required: false,
    unique: false,
  },
});

const ScaleMapSchema = mongoose.model("ScaleMap", ScaleMapSchema_);
module.exports = ScaleMapSchema;
