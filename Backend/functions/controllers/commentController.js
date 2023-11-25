const CommentModel = require("../database/model/CommentModel");

async function getComments(req, res) {
  const { mapId } = req.params;
  try {
    const comments = await CommentModel.getCommentByMapId(mapId);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
}

async function createComment(req, res) {
  const { mapId, userId, content } = req.body;
  console.log(mapId);
  console.log("usssss");
  try {
    const comment = await CommentModel.createComment(mapId, userId, content);
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
}

async function likeComment(req, res) {
  const { userId, commentId } = req.body;
  try {
    const comment = await CommentModel.likeComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
}

async function dislikeComment(req, res) {
  const { userId, commentId } = req.body;
  try {
    const comment = await CommentModel.dislikeComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
}

async function updateComment(req, res) {
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
    res.status(400).send("Server Error");
  }
}

async function deleteComment(req, res) {
  const { userId, commentId } = req.body;
  try {
    const comment = await CommentModel.deleteComment(userId, commentId);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
}

module.exports = {
  getComments,
  createComment,
  likeComment,
  dislikeComment,
  updateComment,
  deleteComment,
};
