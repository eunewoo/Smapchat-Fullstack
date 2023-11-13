const mongoose = require('mongoose');

const ScaleMapSchema_ = new mongoose.Schema({
  mapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  color:{
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

const ScaleMapSchema = mongoose.model("ScaleMap", ScaleMapSchema_);
module.exports = ScaleMapSchema;  
