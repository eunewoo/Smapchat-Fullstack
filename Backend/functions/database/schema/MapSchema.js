const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  mapType: {
    type: Number,
    unique: false,
    required: true,
    maxlength: 5,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  mapID: {
    type: Number,
    required: true,
    unique: true, 
  },
  avgRate: {
    type: Number,
    required: true,
    default: true,
    maxlength: 5,
  },
  comment: {
    type: [Number],
    required: false,
    unique: false,
  },
  mapFile: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  },
  public: {
    type: Number,
    required: true,
    enum: [0,1],
    default:0,
  },
});

const MapModel = mongoose.model("MapSchema", MapSchema);
module.exports = MapModel;
