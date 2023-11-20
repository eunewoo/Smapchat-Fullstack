const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  Longitude: {
    type: Number,
    required: true,
  },
  Lattitude: {
    type: Number,
    required: true,
  },
});

const CategorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Location: {
    type: [LocationSchema],
    required: false,
    unique: false,
  },
  Color: {
    type: String,
    required: false,
  },
});

const CategoryMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    required: true,
    unique: true,
  },
  Category: {
    type: [CategorySchema],
    required: false,
    unique: false,
  },
});

const CategoryMapSchema = mongoose.model("CategoryMap", CategoryMapSchema_);
module.exports = CategoryMapSchema;
