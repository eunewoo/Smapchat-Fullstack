// const MapModel = require("../database/model/MapModel.js");
// const express = require("express");
const express = require("express");
const router = express.Router();

const mapController = require("../controllers/mapController");

router.get("/user/maps/:id", mapController.getMapsByUserId);
router.get("/map/public", mapController.getPublicMaps);
router.get("/map/specific/:mapID", mapController.getSpecificMap);
router.get("/map/public/search", mapController.searchPublicMapsByQuery);
router.get("/map/public/top-rated", mapController.getTopRatedPublicMaps);
router.get("/map/public/recent", mapController.getRecentPublicMaps);
router.get("/map/:userId/search", mapController.searchUserMapsByQuery);
router.get("/map/:userId/top-rated", mapController.getTopRatedUserMaps);
router.get("/map/:userId/recent", mapController.getRecentUserMaps);

router.post("/map/create/pictureMap", mapController.createPictureMap);
router.post("/map/create/arrowMap", mapController.createArrowMap);
router.post("/map/create/bubbleMap", mapController.createBubbleMap);
router.post("/map/create/categoryMap", mapController.createCategoryMap);
router.post("/map/create/scaleMap", mapController.createScaleMap);

router.put("/map/update", mapController.updateMap);
router.put("/map/statusUpdate", mapController.updatePublicStatus);

// router.delete("/map/:mapId", mapController.deleteMapByMapId);

module.exports = router;
