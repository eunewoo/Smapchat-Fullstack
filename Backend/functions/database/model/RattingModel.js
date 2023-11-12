const mongodb = require("mongodb");
const RatingSchema = require("../schema/RatingSchema.js");

class RatingModel {
  //get
  //1
  static async getRatesByMapId(mapId) {
    try {
      const rates = await this.find({ mapID: mapId });
      return rates;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //post
  //4
  static async createRate(userId, mapId, rate) {
    try {
      const createdRate = await this.create({
        userID: userId,
        mapID: mapId,
        rate: rate,
      });
      return createdRate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //put
  //3

  static async updateRate(userId, mapId, rate) {
    try {
      const updatedRate = await this.findOneAndUpdate(
        { userID: userId, mapID: mapId },
        { rate: rate },
        { new: true }
      );
      return updatedRate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete
  //4
  static async deleteRate(userId, mapId) {
    try {
      const deletedRate = await this.findOneAndDelete({
        userID: userId,
        mapID: mapId,
      });
      return deletedRate;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = RatingModel;
