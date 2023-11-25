const mongodb = require("mongodb");
const CommentSchema = require("../schema/CommentSchema.js");
const UserSchema = require("../schema/User.js");

class CommentModel {
  //get
  //1
  static async getCommentByMapId(mapId) {
    try {
      const comments = await CommentSchema.find({
        mapID: mongoose.Types.ObjectId(mapId),
      }).exec();
      return comments;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //post
  //2
  static async createComment(mapId, userId, content) {
    try {
      const user = await UserSchema.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const comment = await CommentSchema.create({
        mapID: mapId,
        commenterId: userId,
        content: content,
        commenterUsername: user.username ?? user.email,
        commenterAvatar: user.avatar,
        date: new Date(),
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
        { _id: mongoose.Types.ObjectId(commentId) },
        {
          $addToSet: { likes: mongoose.Types.ObjectId(userId) },
          $pull: { disLikes: mongoose.Types.ObjectId(userId) },
        },
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
        { _id: mongoose.Types.ObjectId(commentId) },
        {
          $addToSet: { disLikes: mongoose.Types.ObjectId(userId) },
          $pull: { likes: mongoose.Types.ObjectId(userId) },
        },
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
        _id: commentId,
        commenterId: userId,
      });

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = CommentModel;
