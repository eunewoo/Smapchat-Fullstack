const mongodb = require("mongodb");
const CommentSchema = require("../schema/CommentSchema.js");

class CommentModel {
  //get
  //1
  static async getCommentByMapId(mapId) {
    try {
      const comments = await CommentSchema.find({ mapId }).exec();
      return comments;
    } catch (error) {
      throw new Error(error.message);
    }
  } 

  //post
  //2
  static async createComment(mapId, userId, content) {
    try {
      const comment = await CommentSchema.create({
        mapID: mapId,
        userID: userId,
        content: content,
      });

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //3
  static async likeComment(userId, commentId) {
    try {
      const comment = await CommentSchema.findOneAndUpdate(
        { commentID: commentId },
        { $inc: { likes: 1 } },
        { new: true }
      );

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //4
  static async dislikeComment(userId, commentId) {
    try {
      const comment = await CommentSchema.findOneAndUpdate(
        { commentID: commentId },
        { $inc: { disLikes: 1 } },
        { new: true }
      );

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //put
  //5
  static async updateComment(userId, commentId, content) {
    try {
      const comment = await CommentSchema.findOneAndUpdate(
        { commentID: commentId, userID: userId },
        { content: content },
        { new: true }
      );

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete
  //6
  static async deleteComment(userId, commentId) {
    try {
      const comment = await CommentSchema.findOneAndDelete({
        commentID: commentId,
        userID: userId,
      });
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = CommentModel;
