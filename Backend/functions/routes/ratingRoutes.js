const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");

router.get("/rate/:mapId", ratingController.getAvgRateByMapId);

router.post("/rate/create", ratingController.createOrUpdateRate);

// There is no direct delete method yet
// It might need when we add feature to delete rating with deleted user
// router.delete("/rate/delete", ratingController.deleteRate);

module.exports = router;
