import { webFetch, webDelete, webPost, webPut } from "./webUtil";

/// Fetches a users profile as a JSON object based on a
/// provided e-mail address
export async function userProfile(email) {
    return await webFetch(`/User/${email}`);
}

/// Deletes a user of the given userID
export async function deleteUser(userId) {
    return await webDelete(`/User/delete/${userId}`, {});
}

/// Creates a user given an email, username, and password
export async function createUser(email, username, password) {
    const user = {
        email: email,
        username: username,
        password: password,
        avatar: ""
    }
    return await webPost(`/User/create`, user);
}

/// Updates a user on the database with the given user data
export async function updateUserProfile(newProfile) {
    return await webPut(`/User/update/${newProfile.userId}`, newProfile);
}

/// Toggles a users activation status, acts as a soft delete
export async function updateActivationStatus(userId, isActive) {
    return await webPut(`/User/update/activate/${userId}`, {isActive});
}

  const userId = "0000"
  ///all map related api
  //1
  const fetchUserMaps = async () => {
    try {
      const response = await fetch(`/api/user/maps/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching user maps:", error);
    }
  };

  //2
  const fetchPublicMaps = async () => {
    try {
      const response = await fetch("/api/map/public");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching public maps:", error);
    }
  };
  //3
  const fetchSpecificMap = async () => {
    const mapId = "exampleMapId"; // Replace with the actual map ID
    try {
      const response = await fetch(`/api/map/specific/${mapId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching specific map:", error);
    }
  };
  //4
  const fetchPublicSearchMaps = async () => {
    const query = "Query"; 
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/public/search?query=${query}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching public search maps:", error);
    }
  };
  //5
  const fetchTopRatedPublicMaps = async () => {
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/public/top-rated?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching top-rated public maps:", error);
    }
  };
  //6
  const fetchRecentPublicMaps = async () => {
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/public/recent?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching recent public maps:", error);
    }
  };

  //7
  const fetchUserSearchMaps = async () => {
    const query = "Query"; 
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/${userId}/search?query=${query}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching user search maps:", error);
    }
  };
  //8
  const fetchTopRatedUserMaps = async () => {
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/${userId}/top-rated?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching top-rated user maps:", error);
    }
  };
  //9
  const fetchRecentUserMaps = async () => {
    const page = 1;
    const limit = 20;

    try {
      const response = await fetch(
        `/api/map/${userId}/recent?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching recent user maps:", error);
    }
  };
  //10
  const createPictureMap = async () => {
    const mapData = "exampleMapData"; 

    try {
      const response = await fetch("/api/map/create/pictureMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating picture map:", error);
    }
  };
  //11
  const createArrowMap = async () => {
    const mapData = "exampleMapData"; 

    try {
      const response = await fetch("/api/map/create/arrowMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating arrow map:", error);
    }
  };
  //12
  const createBubbleMap = async () => {
    const mapData = "exampleMapData"; 

    try {
      const response = await fetch("/api/map/create/bubbleMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating bubble map:", error);
    }
  };
  //13
  const createCategoryMap = async () => {
    const mapData = "exampleMapData"; 

    try {
      const response = await fetch("/api/map/create/categoryMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating category map:", error);
    }
  };
  //14
  const createScaleMap = async () => {
    const mapData = "exampleMapData"; 

    try {
      const response = await fetch("/api/map/create/scaleMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating scale map:", error);
    }
  };
  //15
  const updateMap = async () => {
    const mapId = "exampleMapId"; 
    const mapData = "exampleMapData";

    try {
      const response = await fetch("/api/map/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapId, mapData }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Error updating map:", error);
    }
  };
  //16
  const updateMapStatus = async () => {
    const mapId = "exampleMapId"; 
    const isPublic = true; 

    try {
      const response = await fetch("/api/map/statusUpdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mapId, isPublic }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Error updating map status:", error);
    }
  };
  //17
  const deleteMap = async () => {
    const mapId = "exampleMapId"; 

    try {
      const response = await fetch(`/api/map/${mapId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Error deleting map:", error);
    }
  };


