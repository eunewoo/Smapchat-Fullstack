const RatingModel = require("../database/model/RatingModel.js");
const express = require("express");

var router = express.Router();

//get
//1
router.get("/api/rate/:mapId", async (req, res) => {
  const { mapId } = req.params;

  try {
    const rates = await RatingModel.getRatesByMapId(mapId);
    res.json(rates);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});

//post
//4

router.post("/api/rate/create", async (req, res) => {
  const { userId, mapId, rate } = req.body;

  try {
    const createdRate = await RatingModel.createRate(userId, mapId, rate);
    res.json(createdRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});

//put
//3
router.put("/api/rate/update", async (req, res) => {
  const { userId, mapId, rate } = req.body;

  try {
    const updatedRate = await RatingModel.updateRate(userId, mapId, rate);
    res.json(updatedRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});

//delete
//4
router.delete("/api/rate/delete", async (req, res) => {
  const { userId, mapId } = req.body;

  try {
    const deletedRate = await RatingModel.deleteRate(userId, mapId);
    res.json(deletedRate);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
