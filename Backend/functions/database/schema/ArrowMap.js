const mongoose = require('mongoose');

const ArrowMapSchema = new mongoose.Schema({
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

const ArrowMapModel = mongoose.model("ArrowMap", ArrowMapSchema);
module.exports = ArrowMapModel; 
