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
        }),
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
    limit = 20,
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

  static async createOrUpdateMap(mapData, graphicData) {
    const current = await MapSchema.exists({MapID: mapData.MapID});

    if (!current) {
      console.log("Creating map");
      return await this.createMap(mapData, graphicData);
    } 
    else {
      console.log("Updating map");
      return await this.updateMap(mapData, graphicData);
    }
  }

  static async createMap(mapData, graphicData) {
    await MapSchema.create(mapData);

    switch(mapData.mapType) {
      case "ArrowMap": ArrowMapSchema.create(graphicData); break;
      case "BubbleMap": BubbleMapSchema.create(graphicData); break;
      //case "PictureMap": PictureMapSchema.create(graphicData); break;
      //case "CategoryMap": CategoryMapSchema.create(graphicData); break;
      //case "ScaleMap": ScaleMapSchema.create(graphicData); break;
    }
  }

  static async updateMap(mapData, graphicData) {
    await MapSchema.findOneAndUpdate({MapID: mapData.MapID}, mapData);

    switch(mapData.mapType) {
      case "ArrowMap": await ArrowMapSchema.findOneAndUpdate({MapID: mapData.MapID}, graphicData); break;
      case "BubbleMap": await BubbleMapSchema.findOneAndUpdate({MapID: mapData.MapID}, graphicData); break;
      //case "PictureMap": PictureMapSchema.findOneAndUpdate({MapID: mapData.MapID}, graphicData); break;
      //case "CategoryMap": CategoryMapSchema.findOneAndUpdate({MapID: mapData.MapID}, graphicData); break;
      //case "ScaleMap": ScaleMapSchema.findOneAndUpdate({MapID: mapData.MapID}, graphicData); break;
    }
  }

  //16
  static async updatePublicStatus(userId, mapId, isPublic) {
    try {
      const updatedMap = await MapSchema.findOneAndUpdate(
        { MapID: mapId },
        { public: isPublic },
        { new: true },
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
  //18
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
}

module.exports = MapModel;
