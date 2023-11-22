const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");

router.get("/api/rate/:mapId", ratingController.getRatesByMapId);

router.post("/api/rate/create", ratingController.createRate);

router.put("/api/rate/update", ratingController.updateRate);

router.delete("/api/rate/delete", ratingController.deleteRate);

module.exports = router;
