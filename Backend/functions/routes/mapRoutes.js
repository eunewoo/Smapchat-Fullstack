const MapModel = require("../database/model/MapModel.js");
const express = require("express");

var router = express.Router();
//1
router.get("/api/user/maps/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.getMapsByUserId(id);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
//2
router.get("/api/map/public", async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    const maps = await MapModel.getPublicMaps(page, limit);

    res.json(maps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
//3
router.get("/api/map/specific/:mapId", async (req, res) => {
  const { mapId } = req.params;
  const { userId } = req.body;

  try {
    const specificMap = await MapModel.getSpecificMapByMapId(userId, mapId);

    res.json(specificMap);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
});
//4
router.get("/api/map/public/search", async (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;

  try {
    const publicMaps = await MapModel.searchPublicMapsByQuery(
      query,
      page,
      limit
    );

    res.json(publicMaps);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//5
router.get("/api/map/public/top-rated", async (req, res) => {
  const { page, limit } = req.query;

  try {
    const topRatedPublicMaps = await MapModel.getTopRatedPublicMaps(
      page,
      limit
    );
    res.json(topRatedPublicMaps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//6
router.get("/api/map/public/recent", async (req, res) => {
  const { page, limit } = req.query;

  try {
    const recentPublicMaps = await MapModel.getRecentPublicMaps(page, limit);
    res.json(recentPublicMaps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//7
  router.get("/api/map/:userId/search", async (req, res) => {
    const { userId } = req.params;
    const { query, page, limit } = req.query;

    try {
      const userMaps = await MapModel.searchUserMapsByQuery(
        userId,
        query,
        page,
        limit
      );
      res.json(userMaps);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
//8
router.get("/api/map/:userId/top-rated", async (req, res) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  try {
    const topRatedUserMaps = await MapModel.getTopRatedUserMaps(
      userId,
      page,
      limit
    );
    res.json(topRatedUserMaps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//9
router.get("/api/map/:userId/recent", async (req, res) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  try {
    const recentUserMaps = await MapModel.getRecentUserMaps(
      userId,
      page,
      limit
    );
    res.json(recentUserMaps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}); 
//post
//10
router.post("/api/map/create/pictureMap", async (req, res) => {
  const { userId, mapData } = req.body;

  try {
    const createdPictureMap = await PictureMapModel.createPictureMap(
      userId,
      mapData
    );
    res.json(createdPictureMap);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//11
router.post("/api/map/create/arrowMap", async (req, res) => {
  const { userId, mapData } = req.body;

  try {
    const result = await ArrowMapModel.createArrowMap(userId, mapData);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//12
router.post("/api/map/create/bubbleMap", async (req, res) => {
  const { userId, mapData } = req.body;

  try {
    const createdBubbleMap = await BubbleMapModel.createBubbleMap(
      userId,
      mapData
    );
    res.json(createdBubbleMap);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//13
router.post("/api/map/create/categoryMap", async (req, res) => {
  const { userId, mapData } = req.body;

  try {
    const createdCategoryMap = await CategoryMapModel.createCategoryMap(
      userId,
      mapData
    );
    res.json(createdCategoryMap);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//14
router.post("/api/map/create/scaleMap", async (req, res) => {
  const { userId, mapData } = req.body;

  try {
    const createdScaleMap = await ScaleMapModel.createScaleMap(userId, mapData);
    res.json(createdScaleMap);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//put
//15
router.put("/api/map/update", async (req, res) => {
  const { userId, mapId, mapData } = req.body;

  try {
    const result = await MapModel.updateMap(userId, mapId, mapData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//16
router.put("/api/map/statusUpdate", async (req, res) => {
  const { userId, mapId, isPublic } = req.body;

  try {
    const result = await MapModel.updatePublicStatus(userId, mapId, isPublic);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//delete
//17
router.delete("/api/map/:mapId", async (req, res) => {
  const { mapId } = req.params;
  const { userId } = req.body;

  try {
    const result = await MapModel.deleteMapByMapId(mapId, userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
