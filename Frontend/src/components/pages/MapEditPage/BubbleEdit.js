//importing routers from map Util
import { createBubbleMap } from "../../../util/mapUtil";

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
const exampleUser = {
  email: "user@example.com",
  username: "example_user",
  password: "securePassword123",
  avatar: "path/to/avatar.jpg",
  isActive: true,
  mapList: [1, 2, 3],
  userType: 1,
  verificationCode: "abc123", 
  isVerified: false,
};


export const BubbleSave = async () => {
    createBubbleMap(exampleMap);
};

export const BubblePublish = async () => {};
