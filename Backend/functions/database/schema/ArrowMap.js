const mongoose = require('mongoose');

const ArrowMapSchema_ = new mongoose.Schema({
  mapID: {
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
    type: [Number],
    required: false,
    unique: false,
  },
  
});

const ArrowMapSchema = mongoose.model("ArrowMap", ArrowMapSchema_);
module.exports = ArrowMapSchema; 
