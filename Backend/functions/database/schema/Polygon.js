const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
  polygonID: {
    type: Number,
    required: true,
    unique: true, 
  },
  Coordinates:{
    type: [mongoose.Schema.Types.Decimal128],
    required: false,
    unique: false,
  },
  
});

const PolygonModel = mongoose.model("Polygon", PolygonSchema);
module.exports = PolygonModel; 
