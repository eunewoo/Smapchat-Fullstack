const mongodb = require("mongodb");
const RatingSchema = require("../schema/RatingSchema.js");
const MapSchema = require("../schema/MapSchema.js");

class RatingModel {
  //get
  static async getAvgRateByMapId(mapId) {
    try {
      const map = await MapSchema.findById(mapId);
      if (!map) {
        throw new Error("Map not found");
      }
      return map.avgRate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createOrUpdateRate(userId, mapId, rate) {
    try {
      let updatedRate;

      // Check if the rate already exists
      const existingRate = await RatingSchema.findOne({
        userID: userId,
        mapID: mapId,
      });

      if (existingRate) {
        // Update the existing rate
        updatedRate = await RatingSchema.findOneAndUpdate(
          { userID: userId, mapID: mapId },
          { rate: rate },
          { new: true }
        );
      } else {
        // Create a new rate
        updatedRate = await RatingSchema.create({
          mapID: mapId,
          userID: userId,
          rate: rate,
        });
      }

      // Calculate the new average rate
      const rates = await RatingSchema.find({ mapID: mapId });
      const totalRate = rates.reduce((acc, curr) => acc + curr.rate, 0);
      const avgRate = (totalRate + rate) / (rates.length + 1);

      // Update the MapSchema
      await MapSchema.findByIdAndUpdate(mapId, { avgRate: avgRate });

      return avgRate; // Return the new average rate
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
