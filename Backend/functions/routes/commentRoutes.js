const CommentModel = require("../database/model/CommentModel.js");
const express = require("express");

var router = express.Router();

//get
//1
router.get("/api/comment/:mapId", async (req, res) => {
  const { mapId } = req.params;

  try {
    const comments = await CommentModel.getCommentByMapId(mapId);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//post
//2
router.post("/api/comment/create", async (req, res) => {
  const { mapId, userId, content } = req.body;

  try {
    const comment = await CommentModel.createComment(mapId, userId, content);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//3
router.post("/api/comment/like", async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    const comment = await CommentModel.likeComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//4
router.post("/api/comment/dislike", async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    const comment = await CommentModel.dislikeComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//put
//5
router.put("/api/comment/update", async (req, res) => {
  const { userId, commentId, content } = req.body;

  try {
    const comment = await CommentModel.updateComment(
      userId,
      commentId,
      content
    );
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//delete
//6
router.delete("/api/comment/delete", async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    const comment = await CommentModel.deleteComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
