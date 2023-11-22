//importing routers from map Util
import {
  createScaleMap,
  fetchSpecificMap,
  getScaleMap,
  updateMap,
  updateMapStatus,
} from "../../../util/mapUtil";

// Sample data that will be replaced by global context later
const exampleMap = {
  MapID: 252,
  MinColor: "#FF0000",
  MaxColor: "#00FF00",
  Location: [
    {
      Name: "Gershwin Theater 2",
      Longitude: -73.9852,
      Lattitude: 40.7624,
      Value: 100,
    },
    {
      Name: "Jumbo 2",
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

//1 for getting Scale map info
// COMPLETE by rendering with it on ScaleMap page
export const fetchScaleMap = async () => {
  const map = await getScaleMap(mapInfo.MapID);
  return map;
};

//2 for creating or updating if one excits Scale map info
// create: COMPLETE with clicking Save button
// update: COMPLETE with clicking Save button
export const ScaleSave = async () => {
  createScaleMap(exampleUserId, exampleUser, exampleMap, mapInfo);
};

//3 changing the map publish status
// COMPLETE with clicking Publish button
// parameter 1 is given always in MapEditpage
export const ScalePublish = async (examplePublicStatus) => {
  updateMapStatus(exampleUserId, exampleMap.MapID, examplePublicStatus);
};

//4 for updating a specfic map
export const updateSpecificMap = async () => {
  updateMap(exampleUserId, mapInfo.MapID, mapInfo);
};

// //5 getting any map
// // Not necessary
// export const fetchMap = async () => {
//   const map = await fetchSpecificMap(exampleMap.MapID);
//   return map;
// };
