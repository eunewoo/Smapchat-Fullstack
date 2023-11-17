import { webFetch, webDelete, webPost, webPut } from "./webUtil";
import axios from "axios";
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
// export const fetchSpecificMap = async (mapId) => {
//   return await webFetch(`/api/map/specific/${mapId}`);
// };
export const fetchSpecificMap = async (mapID) => {
  const apiUrl = `${process.env.REACT_APP_URL}/map/specific/${mapID}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data); 
  } catch (error) {
    console.error("Error fetching specific map:", error);
    throw error; 
  }
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


export const fetchUserSearchMaps = async (query, page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
  );
};


export const fetchTopRatedUserMaps = async (page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
  );
};


export const fetchRecentUserMaps = async (page, limit, userId) => {
  return await webFetch(
    `/api/map/${userId}/recent?page=${page}&limit=${limit}`
  );
};


export const createPictureMap = async (mapData, userId) => {
  return await webPost("/api/map/create/pictureMap", { userId, mapData });
};

export const createArrowMap = async (mapData, userId) => {
  return await webPost("/api/map/create/arrowMap", { userId, mapData });
};

export const createBubbleMap = async (userId, userData, mapData, mapInfo) => {
  const apiUrl = `${process.env.REACT_APP_URL}/map/create/bubbleMap`;

  try {
    const response = await axios.post(apiUrl, { userId, userData, mapData, mapInfo }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Created Bubble Map:", response.data);
    // Handle the response data as needed
  } catch (error) {
    console.error("Error creating Bubble Map (frontend):", error);
    // Handle errors, show an alert, etc.
  }
};

export const createCategoryMap = async (mapData, userId) => {
  return await webPost("/api/map/create/categoryMap", { userId, mapData });
};

export const createScaleMap = async (mapData, userId) => {
  return await webPost("/api/map/create/scaleMap", { userId, mapData });
};

export const updateMap = async (mapId, mapData, userId) => {
  return await webPut("/api/map/update", { userId, mapId, mapData });
};

export const updateMapStatus = async (mapId, isPublic, userId) => {
  return await webPut("/api/map/statusUpdate", { userId, mapId, isPublic });
};

export const deleteMap = async (mapId, userId) => {
  return await webDelete(`/api/map/${mapId}`, { userId });
};
