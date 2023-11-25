const mongoose = require("mongoose");

const PolygonSchema = new mongoose.Schema({
  Coordinates: {
    type: [[Number]],
    required: false,
  },
});

const CategorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Polygons: {
    type: [PolygonSchema],
    required: false,
  },
  Color: {
    type: String,
    required: false,
  },
});

const MapSchema = new mongoose.Schema({
  MapID: {
    type: String,
    required: true,
    unique: true,
  },
  Category: {
    type: [CategorySchema],
    required: false,
  },
});

const CategoryMapSchema = mongoose.model("Categorymaps", MapSchema);
module.exports = CategoryMapSchema;
