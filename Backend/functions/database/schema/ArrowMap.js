const mongoose = require('mongoose');
const ArrowMapLocationSchema = new mongoose.Schema({
  // locationId: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
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
  latitude: {
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

const ArrowMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  maxpin:{
    type:Number,
    required: false,
    unique: false,
  },
  locationIds: {
    type: [ArrowMapLocationSchema],
    required: false,
    unique: false,
  },
  
});

const ArrowMapSchema = mongoose.model("ArrowMap", ArrowMapSchema_);
module.exports = ArrowMapSchema; 
