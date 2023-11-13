const mongoose = require('mongoose');

const CatagoryMapLocationSchema = new mongoose.Schema({
  catagoryID: {
    type: Number,
    required: true,
    unique: true, 
  },
  name:{
    type:String,
    required: false,
    unique: false,
  },
  polygon: {
    type: [Number],
    required: false,
    unique: false,
  },
  color: {
    type: String,
    required: false,
    unique: false,
    default: "#FFFFFF",
  },
  
});

const CatagoryMapLocationModel = mongoose.model("CatagoryMapLocation", CatagoryMapLocationSchema);
module.exports = CatagoryMapLocationModel; 
