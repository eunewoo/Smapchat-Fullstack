//importing routers from map Util
import {
  createCategoryMap,
  fetchSpecificMap,
  getCategoryMap,
  updateMap,
  updateMapStatus,
} from "../../../util/mapUtil";

const exampleMap = {
  MapID: 253,
  Category: [
    {
      Name: "Red places",
      Locations: [
        {
          Longitude: -73.9852,
          Lattitude: 40.7624,
        },
        {
          Longitude: -74.1254,
          Lattitude: 40.59206,
        },
      ],
      Color: "#222222",
    },
    {
      Name: "Blue places",
      Locations: [
        {
          Longitude: -73.9654,
          Lattitude: 40.6653,
        },
      ],
      Color: "#2222FF",
    },
  ],
};

const mapInfo = {
  mapType: 3,
  title: "City Map",
  description: "Detailed map of the city center",
  MapID: 253,
  avgRate: 4.5,
  comment: [10, 15, 20],
  mapFile: "city_map.pdf",
  public: 1,
};

const exampleUser = {
  email: "user@example.com",
  username: "example_user",
  password: "securePassword123",
  avatar: "path/to/avatar.jpg",
  isActive: true,
  mapList: [1, 2, 3, 10, 251, 252, 253],
  userType: 1,
  verificationCode: "abc123",
  isVerified: true,
};
const exampleUserId = "6556b9cde82b7d9bd50261ff";

//1 for getting Category map info
export const fetchCategoryMap = async () => {
  const map = await getCategoryMap(mapInfo.MapID);
  return map;
};

//2 for creating or updating if one excits Category map info
export const CategorySave = async () => {
  createCategoryMap(exampleUserId, exampleUser, exampleMap, mapInfo);
};

//3 changing the map publish status
export const CategoryPublish = async (examplePublicStatus) => {
  updateMapStatus(exampleUserId, exampleMap.MapID, examplePublicStatus);
};

//4 for updating a specfic map
export const updateSpecificMap = async () => {
  updateMap(exampleUserId, mapInfo.MapID, mapInfo);
};
//5 getting any map
export const fetchMap = async () => {
  const map = await fetchSpecificMap(exampleMap.MapID);
  return map;
};
