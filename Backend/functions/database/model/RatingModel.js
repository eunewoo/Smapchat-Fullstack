const mongodb = require("mongodb");
const RatingSchema = require("../schema/RatingSchema.js");

class RatingModel {
  //get
  //1
  static async getRatesByMapId(mapId) {
    try {
      const rates = await RatingSchema.find({ mapID: mapId });
      return rates;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createOrUpdateRate(userId, mapId, rate) {
    try {
      // Check if the rate already exists
      const existingRate = await RatingSchema.findOne({
        userID: userId,
        mapID: mapId,
      });

      if (existingRate) {
        // Update the existing rate
        const updatedRate = await RatingSchema.findOneAndUpdate(
          { userID: userId, mapID: mapId },
          { rate: rate },
          { new: true } // Return the updated document
        );
        console.log("Rate updated:");
        return updatedRate;
      } else {
        // Create a new rate
        const createdRate = await RatingSchema.create({
          mapID: mapId,
          userID: userId,
          rate: rate,
        });
        console.log("Rate created:");
        return createdRate;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete
  //4
  static async deleteRate(userId, mapId) {
    try {
      const deletedRate = await RatingSchema.findOneAndDelete({
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
