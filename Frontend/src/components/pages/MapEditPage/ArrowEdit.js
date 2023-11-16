//importing routers from map Util
import { createArrowMap } from "../../../util/mapUtil";    //here import all routes you need

export const ArrowSave = async () => {};

export const ArrowPublish = async () => {};

export const ArrowClick = (latlng, handler, path) => {

    console.log("Arrow click path: " + path);

    handler.compoundTrans([
        {path: path + ".Lattitude", newValue: latlng.lat},
        {path: path + ".Longitude", newValue: latlng.lng},
    ]);
}
