const mongoose = require("mongoose");

const CommentSchema_ = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  MapID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  commenterUsername: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
  },
});

const CommentSchema = mongoose.model("Comment", CommentSchema_);
module.exports = CommentSchema;
