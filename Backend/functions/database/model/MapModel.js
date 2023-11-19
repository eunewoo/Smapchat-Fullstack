const mongodb = require("mongodb");
const UserSchema = require("../schema/User.js");
const MapSchema = require("../schema/MapSchema.js");
const PictureSchema = require("../schema/PictureMap.js");
const ArrowMapSchema = require("../schema/ArrowMap.js");
const ScaleMapSchema = require("../schema/ScaleMap.js");
const catagoryMapSchema = require("../schema/CatagoryMap.js");
const BubbleMapSchema = require("../schema/BubbleMap.js");
const UserModel = require("../model/UserModel.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { SUPPORTED_REGIONS } = require("firebase-functions/v1");
const { Types } = mongoose;

class MapModel {
  //1
  static async getMapsUserId(userId) {
    
    try {
      const user = await UserSchema.findOne({
        _id: userId,
      }).exec();

      if (!user) {
        throw new Error("User not found");
      }

      const mapList = user.mapList || [];
      // Fetch maps using MapID from the mapList
      const maps = await Promise.all(
        mapList.map(async (mapId) => {
          const map = await MapSchema.findOne({ MapID: mapId }).exec();
          return map;
        })
      );

      return maps;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //2
  static async getPublicMaps(sort = "date", page = 1, limit = 20) {

    const sorter = sort === "rating" ? { avgRate: -1 } : { date: -1 };

    try {
      const maps = await MapSchema.find()
        .sort(sorter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit)); 

      return maps;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //3
  static async getSpecificMapByMapId(mapID) {
    try {
      const map = await MapSchema.findOne({
        MapID: mapID,
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //4
  static async searchPublicMapsByQuery(query, sort = "date", page = 1, limit = 20) {

    const sorter = sort === "rating" ? { avgRate: -1 } : { date: -1 };

    try {
      const publicMaps = await MapSchema.find({
        title: { $regex: query, "$options": "i" },
      })
        .sort(sorter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();

      return publicMaps;
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
  static async createArrowMap(userId, userData, mapData, mapInfo) {
    try {
      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, userData);
      const checkArrow = await ArrowMapSchema.findOne({
        MapID: mapData.MapID,
      });

      const checkMap = await MapSchema.findOne({ MapID: mapData.MapID });
      if (checkArrow) {
        const upd = await BubbleMapSchema.findOneAndUpdate(
          { MapID: mapData.MapID },
          { Location: mapData.Location }
        );
        console.log("Updated Arrow Map:");
      } else {
        const createdArrowMap = await ArrowMapSchema.create({
          MapID: mapData.MapID,
          Location: mapData.Location,
        });
        if (!checkMap) {
          const createdMap = MapSchema.create(mapInfo)
            .then((createdMap) => {
              console.log("Map created:");
            })
            .catch((error) => {
              console.error("Error creating map:", error);
            });
        }
        console.log("Created Arrow Map:");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //12
  static async createBubbleMap(userId, userData, mapData, mapInfo) {
    try {
      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, userData);
      const checkBubble = await BubbleMapSchema.findOne({
        MapID: mapData.MapID,
      });
      const checkMap = await MapSchema.findOne({ MapID: mapData.MapID });
      if (checkBubble) {
        const upd = await BubbleMapSchema.findOneAndUpdate(
          { MapID: mapData.MapID },
          { Location: mapData.Location }
        );
        console.log("Updated Bubble Map:");
      } else {
        if (!checkMap) {
          const createdMap = MapSchema.create(mapInfo)
            .then((createdMap) => {
              console.log("Map created:");
            })
            .catch((error) => {
              console.error("Error creating map:", error);
            });
        }

        if (!checkBubble) { 
          const BubbleMapIndexes = await BubbleMapSchema.collection.indexes();
          const indexesToDelete = BubbleMapIndexes.filter((index) =>
            index.name.startsWith("mapID_")
          );

          const dropPromises = indexesToDelete.map(async (index) => {
            return await BubbleMapSchema.collection.dropIndex(index.name);
          });
          const createdBubbleMap = BubbleMapSchema.create(mapData)
            .then((createdMap) => {
              console.log("Bubble Map created:");
            })
            .catch((error) => {
              console.error("Error creating Bubble map:",error);
            });
        }
      }
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
      const updatedMap = await MapSchema.findOneAndUpdate(
        { MapID: mapId },
        mapData,
        {
          new: true,
        }
      );
      console.log(updatedMap);

      if (!updatedMap) {
        throw new Error(`Map with MapID ${mapId} not found`);
      }

      return updatedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //16
  static async updatePublicStatus(userId, mapId, isPublic) {
    try {
      const updatedMap = await MapSchema.findOneAndUpdate(
        { MapID: mapId },
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
      const deletedMap = await MapSchema.findOneAndDelete({
        _id: mapId,
        userId,
      });

      if (!deletedMap) {
        throw new Error("Map not found");
      }

      return deletedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //18
  static async getBubbleMapByMapId(mapID) {
    try {
      console.log(mapID);
      const map = await BubbleMapSchema.findOne({
        MapID: mapID,
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MapModel;
