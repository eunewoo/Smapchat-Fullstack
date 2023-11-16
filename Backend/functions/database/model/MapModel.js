const mongodb = require("mongodb");
const MapSchema = require("../schema/MapSchema.js");
const PictureSchema = require("../schema/PictureMap.js")
const ArrowMapSchema = require("../schema/ArrowMap.js")
const ScaleMapSchema = require("../schema/ScaleMap.js")
const catagoryMapSchema = require("../schema/CatagoryMap.js")
const BubbleMapSchema = require("../schema/BubbleMap.js")
const bcrypt = require("bcryptjs");

class MapModel {
  //1
  static async getMapsByUserId(id) {
    try {
      const user = await MapSchema.findOne({ _id: new ObjectId(id) }).exec();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //2
  static async getPublicMaps(page = 1, limit = 20) {
    try {
      const maps = await MapSchema.find()
        // here i assumed our map list is classified by page
        // you can modify as it's needed
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      return maps;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //3
  static async getSpecificMapByMapId(userId, mapId) {
    try {
      const map = await MapSchema.findOne({
        _id: new ObjectId(mapId),
        userId: new ObjectId(userId),
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //4
  static async searchPublicMapsByQuery(query, page = 1, limit = 20) {
    try {
      const publicMaps = await MapSchema.find({
        title: { $regex: new RegExp(query, "i") },
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return publicMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //5
  static async getTopRatedPublicMaps(page = 1, limit = 20) {
    try {
      const topRatedPublicMaps = await MapSchema.find({})
        // here i Sorted by avgRate in descending order for give page
        .sort({ avgRate: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return topRatedPublicMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //6
  static async getRecentPublicMaps(page = 1, limit = 20) {
    try {
      const recentPublicMaps = await MapSchema.find({})
        .sort({ date: -1 }) //here i Sorted by date in descending order (recent first)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return recentPublicMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //7
  static async searchUserMapsByQuery(userId, query, page = 1, limit = 20) {
    try {
      const userMaps = await MapSchema.find({
        userId,
        title: { $regex: new RegExp(query, "i") },
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return userMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //8
  static async getTopRatedUserMaps(userId, page = 1, limit = 20) {
    try {
      const topRatedUserMaps = await MapSchema.find({ userId })
        .sort({ avgRate: -1 }) // here i Sorted by avgRate in descending order
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return topRatedUserMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //9
  static async getRecentUserMaps(userId, page = 1, limit = 20) {
    try {
      const recentUserMaps = await MapSchema.find({ userId })
        .sort({ date: -1 }) // Sort by date in descending order (recent first)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return recentUserMaps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //post
  //10
  static async createPictureMap(userId, mapData) {
    try {
      const { pictureMap } = mapData;
      const createdPictureMap = await PictureSchema.create({
        mapId: pictureMap.mapId,
        locationIds: pictureMap.locationIds,
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: pictureMapLocation.mapId },
      });

      return createdPictureMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //11
  static async createArrowMap(userId, mapData) {
    try {
      const { arrowmap } = mapData;

      const createdArrowMap = await ArrowMapSchema.create({
        mapID: arrowmap.mapID,
        maxpin: arrowmap.maxpin,
        locationIds: arrowmap.locationIds,
      });
      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: createdArrowMap.mapID },
      });

      return { createdArrowMap };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //12
  static async createBubbleMap(userId, mapData) {
    try {
      const { bubblemap } = mapData;
      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: bubblemap.mapID },
      });

      // Create BubbleMap
      const createdBubbleMap = await BubbleMapSchema.create({
        mapId: bubblemap.mapID,
        locationIds: bubblemap.locationIds,
      });

      return createdBubbleMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //13
  static async createCategoryMap(userId, mapData) {
    try {
      const { categoryMap } = mapData;

      const createdCategoryMap = await catagoryMapSchema.create({
        mapID: categoryMap.mapId,
        categoryIds: categoryMap.categoryIds,
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: categoryMap.mapId },
      });

      return createdCategoryMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //14
  static async createScaleMap(userId, mapData) {
    try {
      const createdScaleMap = await ScaleMapSchema.create({
        mapID: mapData.mapId,
        color: mapData.minColor,
        locationIds: mapData.locationIds,
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: mapData.mapId },
      });

      return createdScaleMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //put
  //15
  static async updateMap(userId, mapId, mapData) {
    try {
      const updatedMap = await MapSchema.findByIdAndUpdate(mapId, mapData, {
        new: true,
      });

      if (!updatedMap) {
        throw new Error("Map not found");
      }

      return updatedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //16
  static async updatePublicStatus(userId, mapId, isPublic) {
    try {
      const updatedMap = await MapSchema.findByIdAndUpdate(
        mapId,
        { public: isPublic },
        { new: true }
      );

      if (!updatedMap) {
        throw new Error("Map not found");
      }

      return updatedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete
  //17
  static async deleteMapByMapId(mapId, userId) {
    try {
      const deletedMap = await MapSchema.findOneAndDelete({ _id: mapId, userId });

      if (!deletedMap) {
        throw new Error("Map not found");
      }

      return deletedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MapModel;
