// const mongoose = require('mongoose');

// const CatagoryMapSchema_ = new mongoose.Schema({
//   mapID: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   catagoryIds: {
//     type: [Number],
//     required: false,
//     unique: false,
//   },

// });

// const CatagoryMapSchema = mongoose.model("CatagoryMap", CatagoryMapSchema_);
// module.exports = CatagoryMapSchema;

const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Longitude: {
    type: Number,
    required: true,
  },
  Latitude: {
    type: Number,
    required: true,
  },
  SubName: {
    type: String,
    required: true,
  },
  Color: {
    type: String,
    required: true,
  },
});
const CategoryMapSchema_ = new mongoose.Schema({
  MapID: {
    type: Number,
    required: true,
    unique: true,
  },
  Location: {
    type: [LocationSchema],
    required: false,
    unique: false,
  },
});

const CategoryMapSchema = mongoose.model("CategoryMap", CategoryMapSchema_);
module.exports = CategoryMapSchema;
