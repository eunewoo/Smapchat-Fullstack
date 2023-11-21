const mongoose = require("mongoose");

const ArrowMapLocationSchema = new mongoose.Schema({
  locationId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: false,
  },
  longtude: {
    type: mongoose.Schema.Types.Decimal,
    required: false,
    unique: false,
  },
  lattitude: {
    type: mongoose.Schema.Types.Decimal,
    required: false,
    unique: false,
  },
  order: {
    type: Number,
    required: false,
    unique: false,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now,
  },
});

const ArrowMapLocationModel = mongoose.model(
  "ArrowMapLocation",
  ArrowMapLocationSchema,
);
module.exports = ArrowMapLocationModel;
