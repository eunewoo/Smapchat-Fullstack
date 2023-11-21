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

const PictureMapSchema = new Schema({
  MapID: {
    type: String,
    required: true,
    unique: true,
  },
  Location: [PictureMapLocationSchema],
});

const LibraryModel = mongoose.model("Library", LibrarySchema);
const PictureMapLocationModel = mongoose.model(
  "PictureMapLocation",
  PictureMapLocationSchema
);
const PictureMapModel = mongoose.model("PictureMap", PictureMapSchema);

module.exports = {
  LibraryModel,
  PictureMapLocationModel,
  PictureMapModel,
};
