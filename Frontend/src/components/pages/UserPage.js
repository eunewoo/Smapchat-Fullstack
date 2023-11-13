import { useState, useEffect } from "react";
import UserPopup from "../popups/UserPopup";
import { webFetch } from "../../util/webUtil";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  var elems = [];

  if (users.length <= 0) {
    fetch(`${process.env.REACT_APP_URL}/Users`).then((res) => {
      if (res.status === 200) {
        res.json().then((val) => {
          console.log(val);
          setUsers(val);
        });
      } else {
        console.log("Error from server: " + res.status);
      }
    });
  } else {
    users.forEach((id) => {
      elems.push(<UserPopup ID={id._id} />);
    });
  }
  useEffect(() => {
    if (users.length <= 0) {
      // Dummy data, webfetch is being weird with returning null
      // right now since it cant CORS from localhost to the backend.
      // Double check this against live later.
      setUsers([{ test: { username: "test", email: "test@test.com" } }]);
      return;

      webFetch("/Users")
        .then((val) => setUsers(val))
        .catch(() => console.log("Could not retrieve users"));
    } else {
      users.forEach((id) => {
        elems.push(<UserPopup ID={id._id} />);
      });
    }
  });

  ///All user related api

  //1 function for getting user profile
  const UserProfile = () => {
    const userEmail = "alex@email.com";
      const fetchData = async () => {
        try {
          const response = await fetch(`/User/${userEmail}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

    fetchData();
  };
  //2
  const DeleteUser = () => {
    const userId = '00000'; 

    // Function to handle user deletion
    const deleteUser = async () => {
      try {
        const response = await fetch(`/User/delete/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  //3
  // Function to handle user creation
  const createUser = async () => {
    const user = {
      email: 'example@email.com',
      username: 'exampleUsername',
      password: 'examplePassword',
      avatar: 'exampleAvatarUrl',
    };

    try {
      const response = await fetch('/User/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  //4
  // Function to handle user profile update
  const updateUserProfile = async () => {
    const updatedData = {
      // placeholder for the updated data
    };

    try {
      const response = await fetch(`/User/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  //5
  // Function to handle user activation status
  const updateActivationStatus = async () => {
    const isActive = true; 

    try {
      const response = await fetch(`/User/update/activate/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error updating activation status:', error);
    }
  };

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

  return <>{elems}</>;
}
