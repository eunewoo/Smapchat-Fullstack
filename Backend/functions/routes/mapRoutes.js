const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const mapController = require("../controllers/mapController");

router.get("/user/maps/:id", mapController.getMapsByUserId);
router.get("/map/public", mapController.getPublicMaps);
router.get("/map/specific/:mapID", mapController.getSpecificMap);
router.get("/map/public/search", mapController.searchPublicMapsByQuery);

router.get("/map/:userId", mapController.getUserMaps);
router.get("/map/:userId/search", mapController.searchUserMapsByQuery);

router.get("/map/get/bubble/:mapID", mapController.getBubbleMap);
router.get("/map/get/arrow/:mapID", mapController.getArrowMap);

router.post("/map/create", auth, mapController.createMap);

router.put("/map/update", mapController.updateMap);
router.put("/map/statusUpdate", mapController.updatePublicStatus);

// router.delete("/map/:mapId", mapController.deleteMapByMapId);

module.exports = router;
