const express = require("express");
const {
  getComments,
  createComment,
  likeComment,
  dislikeComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController"); 

var router = express.Router();

router.get("/api/comment/:mapId", getComments);
router.post("/api/comment/create", createComment);
router.post("/api/comment/like", likeComment);
router.post("/api/comment/dislike", dislikeComment);
router.put("/api/comment/update", updateComment);
router.delete("/api/comment/delete", deleteComment);

module.exports = router;
