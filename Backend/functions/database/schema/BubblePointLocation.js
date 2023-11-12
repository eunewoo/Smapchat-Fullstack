const mongoose = require('mongoose');

const BubblePointLocationSchema = new mongoose.Schema({
  locationId: {
    type: Number,
    required: true,
    unique: true, 
  },
  name:{
    type:String,
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
  color: {
    type: String,
    required: false,
    unique: false,
    default: "#FFFFFF",
  },
  size: {
    type: Number,
    required: true,
    unique: true, 
  },
  
});

const BubblePointLocationModel = mongoose.model("BubblePointLocation", BubblePointLocationSchema);
module.exports = BubblePointLocationModel; 
