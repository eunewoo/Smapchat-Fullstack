const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibrarySchema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: false,
  },
  Images: {
    type: [String],
    required: false,
    unique: false,
  },
});

const PictureMapLocationSchema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: false,
  },
  Longitude: {
    type: String,
    required: true,
    unique: false,
  },
  Lattitude: {
    type: String,
    required: true,
    unique: false,
  },
  Library: [LibrarySchema],
});

const PictureMapSchema_ = new Schema({
  MapID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
  Location: [PictureMapLocationSchema],
});


const PictureMapSchema = mongoose.model("PictureMap", PictureMapSchema_);

module.exports = PictureMapSchema;
