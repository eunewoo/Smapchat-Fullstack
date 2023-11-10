const mongoose = require('mongoose');

const ScaleMapSchema = new mongoose.Schema({
  mapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  minColor:{
    type:String,
    required: false,
    unique: false,
    default: "#FFFFFF"
  },
  locationIds: {
    type: [Number],
    required: false,
    unique: false,
  },
  
}); 

const ScaleMapModel = mongoose.model("ScaleMap", ScaleMapSchema);
module.exports = ScaleMapModel;  
