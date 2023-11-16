//importing routers from map Util
import { createArrowMap } from "../../../util/mapUtil";    //here import all routes you need

export const ArrowSave = async () => {};

export const ArrowPublish = async () => {};

export const ArrowClick = (latlng, handler, path, hint) => {

    if (hint == "move")
    {
        handler.compoundTrans([
            {path: path + ".Lattitude", newValue: latlng.lat},
            {path: path + ".Longitude", newValue: latlng.lng},
        ]);
    }

    if (hint == "create")
    {
        handler.createTrans(path, {
            Name: "",
            Lattitude: latlng.lat,
            Longitude: latlng.lng,
            Order: 0,
            Date: "",
          });
    }
}
