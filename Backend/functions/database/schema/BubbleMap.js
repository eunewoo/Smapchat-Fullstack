const mongoose = require('mongoose');
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
  Color: {
    type: String,
    required: true,
  },
  Size: {
    type: Number,
    required: true,
  },
});
const BubbleMapSchema_ = new mongoose.Schema({
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

const BubbleMapSchema = mongoose.model("BubbleMap", BubbleMapSchema_);
module.exports = BubbleMapSchema; 
