const mongoose = require("mongoose");

const CatagoryMapSchema_ = new mongoose.Schema({
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

const CatagoryMapSchema = mongoose.model("CatagoryMap", CatagoryMapSchema_);
module.exports = CatagoryMapSchema;
