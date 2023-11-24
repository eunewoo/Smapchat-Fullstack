const RatingModel = require("../database/model/RatingModel");

exports.getAvgRatesByMapId = async (req, res, next) => {
  const { mapId } = req.params;

  try {
    const avgRate = await RatingModel.getAvgRateByMapId(mapId);
    res.json({ avgRate: avgRate });
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.createOrUpdateRate = async (req, res, next) => {
  const { userId, mapId, rate } = req.body;

  try {
    const rateResult = await RatingModel.createOrUpdateRate(
      userId,
      mapId,
      rate
    );

    if (rateResult) {
      res.json(rateResult);
    } else {
      throw new Error("Unable to process rating.");
    }
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
