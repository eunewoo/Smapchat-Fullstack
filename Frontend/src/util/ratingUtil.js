import axios from "axios";

export const getRatesByMapId = async (mapId) => {
  const apiUrl = `${process.env.REACT_APP_URL}/rate/${mapId}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching rates by mapId:", error);
    throw error;
  }
};

export const createOrUpdateRate = async (userId, mapId, rate) => {
  const apiUrl = `${process.env.REACT_APP_URL}/rate/create`;
  try {
    const response = await axios.post(
      apiUrl,
      { userId, mapId, rate },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Rate created or updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating or updating rate:", error);
    throw error;
  }
};

export const deleteRate = async (userId, mapId) => {
  const apiUrl = `${process.env.REACT_APP_URL}/rate/delete`;
  try {
    const response = await axios.delete(apiUrl, {
      data: { userId, mapId },
    });
    console.log("Rate deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting rate:", error);
    throw error;
  }
};
