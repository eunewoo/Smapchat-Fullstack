const mongoose = require("mongoose");

const ScalePolygonSchema = new mongoose.Schema({
  locationID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: false,
  },
  polygon: {
    type: Number,
    required: false,
    unique: false,
  },
  value: {
    type: Number,
    required: false,
    unique: false,
  },
});

const ScalePolygonModel = mongoose.model("ScalePolygon", ScalePolygonSchema);
module.exports = ScalePolygonModel;
