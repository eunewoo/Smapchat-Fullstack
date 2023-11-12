const mongoose = require("mongoose");

const CommentSchema_ = new mongoose.Schema({
  commentID: {
    type: Number,
    required: true,
    unique: true,
  },
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
});

const CommentSchema = mongoose.model("Comment", CommentSchema_);
module.exports = CommentSchema;
