//importing routers from map Util
import {
  createArrowMap,
  updateMapStatus,
  getArrowMap,
} from "../../../util/mapUtil"; //here import all routes you need
const exampleMap = {
  MapID: 12124,
  Maxpin: 11,
  Location: [
    {
      Name: "uluk",
      Longitude: -73.9852,
      Lattitude: 40.7624,
      Order: 1,
      Date: "11-10-2023",
    },
    {
      Name: "Alex",
      Longitude: -73.9853,
      Lattitude: 40.7581,
      Order: 2,
      Date: "11-11-2023",
    },
    {
      Name: "MoMA",
      Longitude: -73.9776,
      Lattitude: 40.7615,
      Order: 3,
      Date: "11-11-2023",
    },
  ],
};

const mapInfo = {
  mapType: 3,
  title: "City Map",
  description: "Detailed map of the city center",
  MapID: 12124,
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

//1 creating arrow map and if one alr created then it just updates
export const ArrowSave = async () => {
  createArrowMap(exampleUserId, exampleUser, exampleMap, mapInfo);
};

//2 changes the public section of the arrowmap
export const ArrowPublish = async (examplePublicStatus) => {
  updateMapStatus(exampleUserId, exampleMap.MapID, examplePublicStatus);
};

//3 getting arrow map
export const fetchArrowMap = async () => {
  const map = await getArrowMap(mapInfo.MapID);
  return map;
};
