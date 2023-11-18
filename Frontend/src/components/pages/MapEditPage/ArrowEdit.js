//importing routers from map Util
import { createArrowMap, updateMapStatus } from "../../../util/mapUtil";    //here import all routes you need
const exampleMap = {
  MapID: 12124,
  Maxpin: 5,
  Location: [
    {
      Name: "Gershwin Theater",
      Longitude: -73.9852,
      Latitude: 40.7624,
      Order: 1,
      Date: "11-10-2023",
    },
    {
      Name: "Time Square",
      Longitude: -73.9853,
      Latitude: 40.7581,
      Order: 2,
      Date: "11-11-2023",
    },
    {
      Name: "MoMA",
      Longitude: -73.9776,
      Latitude: 40.7615,
      Order: 3,
      Date: "11-11-2023",
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


export const ArrowSave = async () => {
    createArrowMap(exampleUserId, exampleUser, exampleMap, mapInfo);
};

export const ArrowPublish = async (examplePublicStatus) => {
  updateMapStatus(exampleUserId, exampleMap.MapID, examplePublicStatus);
};

