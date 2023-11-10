import { useContext, useState } from "react";
import MapRenderer from "./MapRenderer";
import RatingDisplay from "./RatingDisplay";
import { navContext } from "../../App";

/// Component which displays a preview and information about
/// a map. Used for gallery pages to display maps to users.
export default function MapCard() {

    navigate = useContext(navContext);

    // The map data that this card is displaying
    const [mapData, setMapData] = useState({});

    // TODO: Add nav to display page once implemented
    return(
        <div onClick={() => navigate(<></>)}>
            <MapRenderer Geometry={mapData.mapFile} GraphicData={mapData}/>
            <RatingDisplay value={mapData.avgRate}/>

            <div>
                <p>{mapData.title}</p>
                <p>{mapData.author}</p>
            </div>
        </div>
    );
}