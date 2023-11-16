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

export const fetchUserSearchMaps = async (query, page, limit) => {
  return await webFetch(
    `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
  );
};

export const fetchTopRatedUserMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
  );
};

export const fetchRecentUserMaps = async (page, limit) => {
  return await webFetch(
    `/api/map/${userId}/recent?page=${page}&limit=${limit}`
  );
};

export const createPictureMap = async (mapData) => {
  return await webPost("/api/map/create/pictureMap", { userId, mapData });
};

export const createArrowMap = async (mapData) => {
  return await webPost("/api/map/create/arrowMap", { userId, mapData });
};

export const createBubbleMap = async (mapData) => {
  return await webPost("/api/map/create/bubbleMap", { userId, mapData });
};

export const createCategoryMap = async (mapData) => {
  return await webPost("/api/map/create/categoryMap", { userId, mapData });
};

export const createScaleMap = async (mapData) => {
  return await webPost("/api/map/create/scaleMap", { userId, mapData });
};

export const updateMap = async (mapId, mapData) => {
  return await webPut("/api/map/update", { userId, mapId, mapData });
};

export const updateMapStatus = async (mapId, isPublic) => {
  return await webPut("/api/map/statusUpdate", { userId, mapId, isPublic });
};

export const deleteMap = async (mapId) => {
  return await webDelete(`/api/map/${mapId}`, { userId });
};
