//importing routers from map Util
import { createBubbleMap } from "../../../util/mapUtil";

export const BubbleSave = async () => {
    const exampleData = {
      mapID: 55,
      locationIds: [101, 102, 103],
    };
    const mapData = {
      MapID: "1234TEST1234",
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
    createBubbleMap(exampleData);
};

export const BubblePublish = async () => {};
