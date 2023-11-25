const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Longitude: {
    type: Number,
    required: false,
  },
  Latitude: {
    type: Number,
    required: false,
  },
  Value: {
    type: Number,
    required: false,
  },
});

const ScaleMapSchema = new mongoose.Schema({
  MapID: {
    type: String,
    required: true,
    unique: true,
  },
  MinColor: {
    type: String,
    required: true,
  },
  MaxColor: {
    type: String,
    required: true,
  },
  Location: {
    type: [LocationSchema],
    required: false,
  },
});

const ScaleMapModel = mongoose.model("ScaleMap", ScaleMapSchema);
module.exports = ScaleMapModel;
