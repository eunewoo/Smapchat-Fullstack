const MapModel = require("../database/model/MapModel");
const UserModel = require("../database/model/UserModel");

exports.getMapsByUserId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.getMapsByUserId(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getPublicMaps = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    const maps = await MapModel.getPublicMaps(page, limit);
    res.status(200).json(maps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getSpecificMap = async (req, res, next) => {
  const { mapID } = req.params;

  try {
    const specificMap = await MapModel.getSpecificMapByMapId(mapID);
    res.status(200).json(specificMap);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
};

exports.searchPublicMapsByQuery = async (req, res, next) => {
  const { query, page = 1, limit = 20 } = req.query;

  try {
    const publicMaps = await MapModel.searchPublicMapsByQuery(query, page, limit);
    res.status(200).json(publicMaps);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
};

exports.getTopRatedPublicMaps = async (req, res, next) => {
  const { page, limit } = req.query;

  try {
    const topRatedPublicMaps = await MapModel.getTopRatedPublicMaps(page, limit);
    res.status(200).json(topRatedPublicMaps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getRecentPublicMaps = async (req, res, next) => {
  const { page, limit } = req.query;

  try {
    const recentPublicMaps = await MapModel.getRecentPublicMaps(page, limit);
    res.json(recentPublicMaps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.searchUserMapsByQuery = async (req, res, next) => {
  const { userId } = req.params;
  const { query, page, limit } = req.query;

  try {
    const userMaps = await MapModel.searchUserMapsByQuery(userId, query, page, limit);
    res.status(200).json(userMaps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getTopRatedUserMaps = async (req, res, next) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  try {
    const topRatedUserMaps = await MapModel.getTopRatedUserMaps(userId, page, limit);
    res.json(topRatedUserMaps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getRecentUserMaps = async (req, res, next) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  try {
    const recentUserMaps = await MapModel.getRecentUserMaps(userId, page, limit);
    res.json(recentUserMaps);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createPictureMap = async (req, res, next) => {
  const { userId, mapData } = req.body;

  try {
    const createdPictureMap = await MapModel.createPictureMap(userId, mapData);
    res.json(createdPictureMap);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createArrowMap = async (req, res, next) => {
  const { userId, mapData } = req.body;

  try {
    const result = await MapModel.createArrowMap(userId, mapData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createBubbleMap = async (req, res, next) => {
    const { userId, userData, mapData, mapInfo } = req.body;
  try {
        const b = await MapModel.createBubbleMap(userId,userData,mapData, mapInfo);
        res.json(b);
  } catch (error) {
    console.error(error);
    res.status(400).send(mapData);
  }
};

exports.createCategoryMap = async (req, res, next) => {
  const { userId, mapData } = req.body;

  try {
    const createdCategoryMap = await MapModel.createCategoryMap(
      userId,
      mapData
    );
    res.json(createdCategoryMap);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createScaleMap = async (req, res, next) => {
  const { userId, mapData } = req.body;

  try {
    const createdScaleMap = await MapModel.createScaleMap(userId, mapData);
    res.json(createdScaleMap);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.updateMap = async (req, res, next) => {
  const { userId, mapId, mapData } = req.body;
  try {
    const result = await MapModel.updateMap(userId, mapId, mapData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.updatePublicStatus = async (req, res, next) => {
  const { userId, mapId, isPublic } = req.body;

  try {
    const result = await MapModel.updatePublicStatus(userId, mapId, isPublic);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.deleteMap = async (req, res, next) => {
  const { mapId } = req.params;
  const { userId } = req.body;

  try {
    const result = await MapModel.deleteMapByMapId(mapId, userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.getBubbleMap = async (req, res, next) => {
  const { mapID } = req.params;

  try {
    const result = await MapModel.getBubbleMapByMapId(mapID);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

