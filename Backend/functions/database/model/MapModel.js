const mongodb = require("mongodb");
const MapSchema = require("../schema/MapSchema.js");
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
        .sort({ avgRate: -1 }) // Sort by avgRate in descending order
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
        .sort({ date: -1 }) // Sort by date in descending order (recent first)
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
        .sort({ avgRate: -1 }) // Sort by avgRate in descending order
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
  async createPictureMap(userId, mapData) {
    try {
      const { pictureMapLocation } = mapData;
      const createdPictureMap = await this.create({
        mapId: pictureMapLocation.locationId, // Assuming locationId is unique for each picture map
        pictureMapLocation,
      });

      // Assuming there's a field in your user schema to store the mapId
      // Adjust this according to your user schema
      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: pictureMapLocation.locationId },
      });

      return createdPictureMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //11
  static async createArrowMap(userId, mapData) {
    try {
      const { locationIds } = mapData;

      // Create ArrowMap
      const createdArrowMap = await this.create({
        mapID: locationIds[0], // Assuming the first locationId is unique for each arrow map
        maxpin: mapData.maxpin,
        locationIds,
      });

      // Assuming you have a field in your user schema to store the mapID
      // Adjust this according to your user schema
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
      const { bubblePointLocation, details } = mapData;

      // Update user's mapList
      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: bubblePointLocation.libraryId },
      });

      // Create BubbleMap
      const createdBubbleMap = await this.create({
        mapId: bubblePointLocation.libraryId,
        bubblePointLocation,
        details,
      });

      return createdBubbleMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //13
  static async createCategoryMap(userId, mapData) {
    try {
      // Assuming you have a proper method to generate a unique mapID
      const mapId = generateUniqueMapId();

      const { details, categoryMap } = mapData;

      // Assuming you have a proper method to generate unique categoryIds
      const categoryIds = generateUniqueCategoryIds(
        categoryMap.category.polygon.length
      );

      const createdCategoryMap = await this.create({
        mapID: mapId,
        categoryIds: categoryIds,
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: mapId },
      });

      return createdCategoryMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //14
  static async createScaleMap(userId, mapData) {
    try {
      const createdScaleMap = await this.create({
        mapID: mapData.scaleMap.mapId,
        minColor: mapData.scaleMap.minColor,
        locationIds: [mapData.scaleMap.scalePolygon.locationId],
      });

      // Assuming there's a field in your user schema to store the mapId
      // Adjust this according to your user schema
      await UserModel.findByIdAndUpdate(userId, {
        $push: { mapList: mapData.scaleMap.mapId },
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
      const updatedMap = await this.findByIdAndUpdate(mapId, mapData, {
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
      const updatedMap = await this.findByIdAndUpdate(
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
      const deletedMap = await this.findOneAndDelete({ _id: mapId, userId });

      if (!deletedMap) {
        throw new Error("Map not found");
      }

      return deletedMap;
    } catch (error) {
      throw new Error(error.message);
    }
  }

};



module.exports = MapModel;
