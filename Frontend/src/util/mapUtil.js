import { webFetch, webDelete, webPost, webPut } from "./webUtil";
///all map related api
//1
export const fetchUserMaps = async (userId) => {
  return await webFetch(`/api/user/maps/${userId}`);
};

//2
export const fetchPublicMaps = async () => {
  return await webFetch("/api/map/public");
};
//3
export const fetchSpecificMap = async (mapId) => {
  return await webFetch(`/api/map/specific/${mapId}`);
};
export const fetchPublicSearchMaps = async (query, page, limit) => {
  return await webFetch(
    `/api/map/public/search?query=${query}&page=${page}&limit=${limit}`
  );
};

export const fetchTopRatedPublicMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/public/top-rated?page=${page}&limit=${limit}`
  );
};

export const fetchRecentPublicMaps = async (page, limit) => {
  return await webFetch(`/api/map/public/recent?page=${page}&limit=${limit}`);
};


const fetchUserSearchMaps = async (query, page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
  );
};


const fetchTopRatedUserMaps = async (page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
  );
};


const fetchRecentUserMaps = async (page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/recent?page=${page}&limit=${limit}`
  );
};


const createPictureMap = async (mapData, userId) => {
  return await webPost("/api/map/create/pictureMap", { userId, mapData });
};

const createArrowMap = async (mapData, userId) => {
  return await webPost("/api/map/create/arrowMap", { userId, mapData });
};

const createBubbleMap = async (mapData, userId) => {
  return await webPost("/api/map/create/bubbleMap", { userId, mapData });
};

const createCategoryMap = async (mapData, userId) => {
  return await webPost("/api/map/create/categoryMap", { userId, mapData });
};

const createScaleMap = async (mapData, userId) => {
  return await webPost("/api/map/create/scaleMap", { userId, mapData });
};

const updateMap = async (mapId, mapData, userId) => {
  return await webPut("/api/map/update", { userId, mapId, mapData });
};

const updateMapStatus = async (mapId, isPublic, userId) => {
  return await webPut("/api/map/statusUpdate", { userId, mapId, isPublic });
};

const deleteMap = async (mapId, userId) => {
  return await webDelete(`/api/map/${mapId}`, { userId });
};
