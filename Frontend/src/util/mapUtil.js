import { webFetch, webDelete, webPost, webPut } from "./webUtil";
import axios from "axios";
///all map related api
//1
export const fetchUserMaps = async (userId) => {
  const apiUrl = `${process.env.REACT_APP_URL}/user/maps/${userId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

//2
export const fetchPublicMaps = async (sort, page, limit) => {
  const maps = await webFetch(`/map/public?page=${page}&limit=${limit}`);
  console.log("publis maps: ", maps);
  return maps;
};
//3
export const fetchSpecificMap = async (mapID) => {
  const apiUrl = `/map/specific/${mapID}`;
  return await webFetch(apiUrl);
};

export const fetchPublicSearchMaps = async (query, sort, page, limit) => {
  return await webFetch(
    `/map/public/search?query=${query}&sort=${sort}&page=${page}&limit=${limit}`,
  );
};

export const fetchUserSearchMaps = async (query, page, limit, userId) => {
  return await webFetch(
    `/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`,
  );
};

export const fetchTopRatedUserMaps = async (page, limit, userId) => {
  return await webFetch(`/map/${userId}/top-rated?page=${page}&limit=${limit}`);
};

export const fetchRecentUserMaps = async (page, limit, userId) => {
  return await webFetch(`/map/${userId}/recent?page=${page}&limit=${limit}`);
};

export const createMap = async (mapData, graphicData) => {
  return await webPost("/map/create", {"mapData": mapData, "graphicData": graphicData});
}

export const updateMap = async (userId, mapId, mapData) => {
  const apiUrl = `/map/update`;
  return await webPut(apiUrl, {
    userId,
    mapId,
    mapData,
  });
};

export const updateMapStatus = async (userId, mapId, isPublic) => {
  const apiUrl = `/map/statusUpdate`;
  return await webPut(apiUrl, {
    userId,
    mapId,
    isPublic,
  });
};

export const deleteMap = async (mapId, userId) => {
  return await webDelete(`/map/${mapId}`, { userId });
};

export const getBubbleMap = async (mapID) => {
  const apiUrl = `/map/get/bubble/${mapID}`;
  return await webFetch(apiUrl);
};

export const getArrowMap = async (mapID) => {
  const apiUrl = `/map/get/arrow/${mapID}`;
  return await webFetch(apiUrl);
};
