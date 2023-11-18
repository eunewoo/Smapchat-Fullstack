//importing routers from map Util
import {
  createBubbleMap,
  fetchSpecificMap,
  getBubbleMap,
  updateMap,
  updateMapStatus,
} from "../../../util/mapUtil";

const exampleMap = {
  MapID: 12345,
  Location: [
    {
      Name: "Gershwin Theater",
      Longitude: -73.9852,
      Latitude: 40.7624,
      Color: "#FF0000",
      Size: 5,
    },
    {
      Name: "Time Square",
      Longitude: -73.9853,
      Latitude: 40.7581,
      Color: "#FFFF00",
      Size: 1,
    },
    {
      Name: "MoMA",
      Longitude: -73.9776,
      Latitude: 40.7615,
      Color: "#FFFF00",
      Size: 3,
    },
  ],
};
const mapInfo = {
  mapType: 3,
  title: "City Map",
  description: "Detailed map of the city center",
  MapID: 12345,
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
  mapList: [1, 55],
  userType: 1,
  verificationCode: "abc123",
  isVerified: true,
};
const exampleUserId = "6556b9cde82b7d9bd50261ff";

//1 for getting bubble map info
export const fetchBubbleMap = async () => {
  //2this is for only bubble map
  const map = await getBubbleMap(mapInfo.MapID);
  return map;
};

//2 for creating or updating if one excits bubble map info
export const BubbleSave = async () => {
  createBubbleMap(exampleUserId, exampleUser, exampleMap, mapInfo)
};

//3 changing the map publish status
export const BubblePublish = async (examplePublicStatus) => {
  updateMapStatus(exampleUserId, exampleMap.MapID, examplePublicStatus);
};

//4 for updating a specfic map
export const updateSpecificMap = async () => {
  updateMap(exampleUserId, mapInfo.MapID, mapInfo);
};
//5 getting any map
export const fetchMap = async () => {
  const map = await fetchSpecificMap(exampleMap.MapID);
  return map
}
