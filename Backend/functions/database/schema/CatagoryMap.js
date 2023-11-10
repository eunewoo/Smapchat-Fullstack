const mongoose = require('mongoose');

const CatagoryMapSchema = new mongoose.Schema({
  mapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  catagoryIds: {
    type: [Number],
    required: false,
    unique: false,
  },
  
}); 

const CatagoryMapModel = mongoose.model("CatagoryMap", CatagoryMapSchema);
module.exports = CatagoryMapModel; 
