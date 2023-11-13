import { webFetch, webDelete, webPost, webPut } from "./webUtil";
///all map related api
//1
const fetchUserMaps = async (userId) => {
    return await webFetch(`/api/user/maps/${userId}`);
};

//2
const fetchPublicMaps = async () => {
    return await webFetch("/api/map/public");
}
//3
const fetchSpecificMap = async (mapId) => {
  return await webFetch(`/api/map/specific/${mapId}`);
};
const fetchPublicSearchMaps = async (query, page, limit) => {
  return await webFetch(
    `/api/map/public/search?query=${query}&page=${page}&limit=${limit}`
  );
};

const fetchTopRatedPublicMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/public/top-rated?page=${page}&limit=${limit}`
  );
};

const fetchRecentPublicMaps = async (page, limit) => {
  return await webFetch(`/api/map/public/recent?page=${page}&limit=${limit}`);
};

const fetchUserSearchMaps = async (query, page, limit) => {
  return await webFetch(
    `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
  );
};

const fetchTopRatedUserMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
  );
};

const fetchRecentUserMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/${userId}/recent?page=${page}&limit=${limit}`
  );
};

const createPictureMap = async (mapData) => {
  return await webPost("/api/map/create/pictureMap", { userId, mapData });
};

const createArrowMap = async (mapData) => {
  return await webPost("/api/map/create/arrowMap", { userId, mapData });
};

const createBubbleMap = async (mapData) => {
  return await webPost("/api/map/create/bubbleMap", { userId, mapData });
};

const createCategoryMap = async (mapData) => {
  return await webPost("/api/map/create/categoryMap", { userId, mapData });
};

const createScaleMap = async (mapData) => {
  return await webPost("/api/map/create/scaleMap", { userId, mapData });
};

const updateMap = async (mapId, mapData) => {
  return await webPut("/api/map/update", { userId, mapId, mapData });
};

const updateMapStatus = async (mapId, isPublic) => {
  return await webPut("/api/map/statusUpdate", { userId, mapId, isPublic });
};

const deleteMap = async (mapId) => {
  return await webDelete(`/api/map/${mapId}`, { userId });
};