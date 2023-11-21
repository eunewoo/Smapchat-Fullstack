const mongoose = require("mongoose");

const PictureMapSchema_ = new mongoose.Schema({
  mapID: {
    type: Number,
    required: true,
    unique: true,
  },
  locationIds: {
    type: [Number],
    required: false,
    unique: false,
  },
});

const PictureSchema = mongoose.model("PictureMap", PictureMapSchema_);
module.exports = PictureSchema;
