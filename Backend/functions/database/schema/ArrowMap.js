const mongoose = require('mongoose');
const ArrowMapLocationSchema = new mongoose.Schema({
  // locationId: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  Name: {
    type: String,
    required: false,
    unique: false,
  },
  Longitude: {
    type: Number,
    required: false,
    unique: false,
  },
  Latitude: {
    type: Number,
    required: false,
    unique: false,
  },
  Order: {
    type: Number,
    required: false,
    unique: false,
  },
  Date: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now,
  },
});

const ArrowMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    required: true,
    unique: true,
  },
  Maxpin: {
    type: Number,
    required: false,
    unique: false,
  },
  Location: {
    type: [ArrowMapLocationSchema],
    required: false,
    unique: false,
  },
});

const ArrowMapSchema = mongoose.model("ArrowMap", ArrowMapSchema_);
module.exports = ArrowMapSchema; 
