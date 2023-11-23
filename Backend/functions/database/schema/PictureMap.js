const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const LibrarySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Images: {
    type: [ImageSchema],
    required: false,
  },
});

const LocationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Library: {
    type: [LibrarySchema],
    required: false,
  },
  Longitude: {
    type: String,
    required: false,
  },
  Latitude: {
    type: String,
    required: false,
  },
});

const PictureSchema = new mongoose.Schema({
  MapID: {
    type: String,
    required: true,
    unique: true,
  },
  Location: {
    type: [LocationSchema],
    required: false,
  },
});

const PictureMapSchema = mongoose.model("PictureMap", PictureSchema);
module.exports = PictureMapSchema;
