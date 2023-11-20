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
  lattitude: {
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
    unique: true,
    required: true,
    default: 0,
  },
  Location: {
    type: [LocationSchema],
    required: false,
    unique: false,
  },
});

const BubbleMapSchema = mongoose.model("BubbleMap", BubbleMapSchema_);
module.exports = BubbleMapSchema;
