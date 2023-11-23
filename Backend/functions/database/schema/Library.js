const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  libraryID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    unique: false,
  },
  images: {
    type: [String],
    required: false,
    unique: false,
  },
});

const LibraryModel = mongoose.model("Library", LibrarySchema);
module.exports = LibraryModel;
