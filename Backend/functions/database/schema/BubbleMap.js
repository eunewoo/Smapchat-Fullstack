const mongoose = require('mongoose');

const BubbleMapSchema_ = new mongoose.Schema({
  mapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  locationIds: {
    type: [Number],
    required: false,
    unique: false,
  },
  
});

const BubbleMapSchema = mongoose.model("BubbleMap", BubbleMapSchema_);
module.exports = BubbleMapSchema; 
