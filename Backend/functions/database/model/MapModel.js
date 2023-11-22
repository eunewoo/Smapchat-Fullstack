const mongodb = require("mongodb");
const UserSchema = require("../schema/User.js");
const MapSchema = require("../schema/MapSchema.js");
const { PictureMapModel } = require("../schema/PictureMap.js");
const ArrowMapSchema = require("../schema/ArrowMap.js");
const ScaleMapSchema = require("../schema/ScaleMap.js");
const CategoryMapSchema = require("../schema/CategoryMap.js");
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
  static async searchPublicMapsByQuery(
    query,
    sort = "date",
    page = 1,
    limit = 20
  ) {
    const sorter = sort === "rating" ? { avgRate: -1 } : { date: -1 };

    try {
      const publicMaps = await MapSchema.find({
        title: { $regex: query, $options: "i" },
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
  static async createPictureMap(userId, mapData, mapInfo) {
    try {
      const checkPictureMap = await PictureMapModel.findOne({
        MapID: mapData.MapID,
      });

      if (checkPictureMap) {
        // Update the existing Picture Map
        const updatedPictureMap = await PictureMapModel.findOneAndUpdate(
          { MapID: mapData.MapID },
          { Location: mapData.Location },
          { new: true }
        );
        console.log("Updated Picture Map:", mapData.MapID);
        return updatedPictureMap;
      } else {
        // Create a new Map
        const createdMap = await MapSchema.create(mapInfo);

        // Create a new Picture Map
        const createdPictureMap = await PictureMapModel.create(mapData);

        // Update user's mapList
        await UserModel.addMapToUserMapList(userId, createdPictureMap.MapID);

        console.log("Picture Map created:", createdPictureMap.MapID);
        return createdPictureMap;
      }
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
        const upd = await ArrowMapSchema.findOneAndUpdate(
          { MapID: mapData.MapID },
          { Location: mapData.Location },
          { Maxpin: mapData.Maxpin }
        );
        console.log("Updated Arrow Map:", mapData.Maxpin);
      } else {
        if (!checkMap) {
          const createdMap = await MapSchema.create(mapInfo);
          console.log("Map created:");
        }

        if (!checkArrow) {
          const ArrowMapIndexes = await ArrowMapSchema.collection.indexes();
          const indexesToDelete = ArrowMapIndexes.filter((index) =>
            index.name.startsWith("mapID_")
          );

          const dropPromises = indexesToDelete.map(async (index) => {
            return await ArrowMapSchema.collection.dropIndex(index.name);
          });

          const createdArrowMap = await ArrowMapSchema.create(mapData);
          console.log("Arrow Map created:");
        }
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
              console.error("Error creating Bubble map:", error);
            });
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //13
  static async createScaleMap(userId, userData, mapData, mapInfo) {
    try {
      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, userData);
      const checkScale = await ScaleMapSchema.findOne({
        MapID: mapData.MapID,
      });
      const checkMap = await MapSchema.findOne({ MapID: mapData.MapID });
      if (checkScale) {
        const upd = await ScaleMapSchema.findOneAndUpdate(
          { MapID: mapData.MapID },
          {
            Location: mapData.Location,
            MinColor: mapData.MinColor,
            MaxColor: mapData.MaxColor,
          }
        );
        console.log("Updated Scale Map:");
      } else {
        const createScaleMap = await ScaleMapSchema.create({
          MapID: mapData.MapID,
          Location: mapData.Location,
          MinColor: mapData.MinColor,
          MaxColor: mapData.MaxColor,
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
        console.log("Created Scale Map:");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //14
  static async createCategoryMap(userId, userData, mapData, mapInfo) {
    try {
      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, userData);
      const checkCategory = await CategoryMapSchema.findOne({
        MapID: mapData.MapID,
      });
      const checkMap = await MapSchema.findOne({ MapID: mapData.MapID });
      if (checkCategory) {
        const upd = await CategoryMapSchema.findOneAndUpdate(
          { MapID: mapData.MapID },
          { Category: mapData.Category }
        );
        console.log("Updated Category Map:");
      } else {
        const createCategoryMap = await CategoryMapSchema.create({
          MapID: mapData.MapID,
          Category: mapData.Category,
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
        console.log("Created Category Map:");
      }
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

  //19
  static async getArrowMapByMapId(mapID) {
    try {
      const map = await ArrowMapSchema.findOne({
        MapID: mapID,
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //20
  static async getCategoryMapByMapId(mapID) {
    try {
      console.log(mapID);
      const map = await CategoryMapSchema.findOne({
        MapID: mapID,
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //21
  static async getScaleMapByMapId(mapID) {
    try {
      console.log(mapID);
      const map = await ScaleMapSchema.findOne({
        MapID: mapID,
      }).exec();

      return map;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MapModel;
