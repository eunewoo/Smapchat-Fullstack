import { useContext, useState } from "react";
import MapRenderer from "./MapRenderer";
import RatingDisplay from "./RatingDisplay";
import { navContext } from "../../App";
import Card from 'react-bootstrap/Card';
import './MapCard.css';

/// Component which displays a preview and information about
/// a map. Used for gallery pages to display maps to users.
export default function MapCard(props) {

    // The map data that this card is displaying
    const [mapData, setMapData] = useState({});

    // Temporary hardcoded data for build 2!
    if (Object.keys(mapData).length === 0)
    {
        setMapData(
            {
                avgRate: 4,
                title: "Cool map!",
                author: "Alex"
            }
        )
    }

    // TODO: Add nav to display page once implemented
    return(
        <Card style={{width: "500px"}}>
            <MapRenderer Geometry={mapData.mapFile} GraphicData={mapData} width="100%" height="300px"/>
            <RatingDisplay value={mapData.avgRate}/>
            <Card.Body style={{backgroundColor: "#141488", color: "white"}}>
                <Card.Title>{mapData.title ?? "Loading..."}</Card.Title>
                <Card.Text>
                    by {mapData.author ?? "Loading..."}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}