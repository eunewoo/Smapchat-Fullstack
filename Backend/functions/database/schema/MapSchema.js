const mongoose = require("mongoose");

const MapSchema_ = new mongoose.Schema({
  mapType: {
    type: Number,
    unique: false,
    required: true,
    maxlength: 5,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  MapID: {
    type: Number,
    required: true,
    unique: true,
  },
  avgRate: {
    type: Number,
    required: false,
    default: 0,
  },
  comment: {
    type: [Number],
    required: false,
    unique: false,
  },
  mapFile: {
    type: String,
    required: false,
    unique: false,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  public: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0,
  },
});

const MapSchema = mongoose.model("Map", MapSchema_);
module.exports = MapSchema;
