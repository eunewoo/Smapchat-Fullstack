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

export const fetchUserSearchMaps = async (userId, query, page, limit) => {
  return await webFetch(
    `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
  );
};

export const fetchTopRatedUserMaps = async (userId, page, limit) => {
  return await webFetch(
    `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
  );
};

export const fetchRecentUserMaps = async (userId, page, limit) => {
  return await webFetch(
    `/api/map/${userId}/recent?page=${page}&limit=${limit}`
  );
};

export const createPictureMap = async (userId, mapData) => {
  return await webPost("/api/map/create/pictureMap", { userId, mapData });
};

export const createArrowMap = async (userId, mapData) => {
  return await webPost("/api/map/create/arrowMap", { userId, mapData });
};

export const createBubbleMap = async (userId, mapData) => {
  // return await webPost("/api/map/create/bubbleMap", { userId, mapData });
  fetch(
    "http://127.0.0.1:5001/smapchat-back/us-central1/api/map/create/bubbleMap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, mapData }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Created Bubble Map:", data);
      // Handle the response data as needed
    })
    .catch((error) => {
      console.error("Error creating Bubble Map:", error);
      // Handle errors, show an alert, etc.
    });
};

export const createCategoryMap = async (userId, mapData) => {
  return await webPost("/api/map/create/categoryMap", { userId, mapData });
};

export const createScaleMap = async (userId, mapData) => {
  return await webPost("/api/map/create/scaleMap", { userId, mapData });
};

export const updateMap = async (userId, mapId, mapData) => {
  return await webPut("/api/map/update", { userId, mapId, mapData });
};

export const updateMapStatus = async (userId, mapId, isPublic) => {
  return await webPut("/api/map/statusUpdate", { userId, mapId, isPublic });
};

export const deleteMap = async (userId, mapId) => {
  return await webDelete(`/api/map/${mapId}`, { userId });
};
