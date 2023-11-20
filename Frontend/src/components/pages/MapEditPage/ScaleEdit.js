//importing routers from map Util
import {
  createScaleMap,
  fetchSpecificMap,
  getScaleMap,
  updateMap,
  updateMapStatus,
} from "../../../util/mapUtil";

const exampleMap = {
  MapID: 252,
  MinColor: "#FF0000",
  MaxColor: "#00FF00",
  Location: [
    {
      Name: "Gershwin Theater",
      Longitude: -73.9852,
      Lattitude: 40.7624,
      Value: 100,
    },
    {
      Name: "MoMA",
      Longitude: -73.9776,
      Lattitude: 40.7615,
      Value: 100,
    },
    {
      Name: "Dumbo",
      Longitude: -73.9654,
      Lattitude: 40.6653,
      Value: 0,
    },
  ],
};

const mapInfo = {
  mapType: 5,
  title: "City Map",
  description: "Detailed map of the city center",
  MapID: 252,
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
  mapList: [1, 2, 3, 10, 1234],
  userType: 1,
  verificationCode: "abc123",
  isVerified: true,
};
const exampleUserId = "6556b9cde82b7d9bd50261ff";

const examplePublicStatus = 0;

//1 for getting Scale map info
export const fetchScaleMap = async () => {
  const map = await getScaleMap(mapInfo.MapID);
  return map;
};

//2 for creating or updating if one excits Scale map info
export const ScaleSave = async () => {
  createScaleMap(exampleUserId, exampleUser, exampleMap, mapInfo);
};

//3 changing the map publish status
export const ScalePublish = async (examplePublicStatus) => {
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
