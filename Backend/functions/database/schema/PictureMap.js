const mongoose = require('mongoose');

const PictureMapSchema = new mongoose.Schema({
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

const PictureMapModel = mongoose.model("PictureMap", PictureMapSchema);
module.exports = PictureMapModel;
