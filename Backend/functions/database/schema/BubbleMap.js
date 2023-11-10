const mongoose = require('mongoose');

const BubbleMapSchema = new mongoose.Schema({
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

const BubbleMapModel = mongoose.model("BubbleMap", BubbleMapSchema);
module.exports = BubbleMapModel; 
