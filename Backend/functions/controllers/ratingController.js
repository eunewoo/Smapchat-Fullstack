const RatingModel = require("../database/model/RatingModel");

exports.getRatesByMapId = async (req, res, next) => {
  const { mapId } = req.params;

  try {
    const rates = await RatingModel.getRatesByMapId(mapId);
    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createRate = async (req, res, next) => {
  const { userId, mapId, rate } = req.body;

  try {
    const createdRate = await RatingModel.createRate(userId, mapId, rate);
    res.json(createdRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.updateRate = async (req, res, next) => {
  try {
    const updatedRate = await RatingModel.updateRate(userId, mapId, rate);
    res.json(updatedRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.deleteRate = async (req, res, next) => {
  const { userId, mapId } = req.body;

  try {
    const deletedRate = await RatingModel.deleteRate(userId, mapId);
    res.json(deletedRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};
