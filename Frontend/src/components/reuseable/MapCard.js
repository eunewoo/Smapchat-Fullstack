import { useContext, useState } from "react";
import MapRenderer from "./MapRenderer";
import RatingDisplay from "./RatingDisplay";
import { useNavigate } from "react-router-dom";
import { navContext } from "../../App";
import Card from "react-bootstrap/Card";
import "./MapCard.css";

export default function MapCard(props) {
  // The map data that this card is displaying
  const [mapData, setMapData] = useState({});
  const numberOfColumns = props.numberOfColumns;
  const navigate = useNavigate();
  let cardWidth = 45;

  const handleRouteToViewMapPage = () => navigate("/view-map-page");
  if (numberOfColumns === 2) {
    cardWidth = 45;
  } else if (numberOfColumns === 3) {
    cardWidth = 30;
  }

  // Temporary hardcoded data for build 2!
  if (Object.keys(mapData).length === 0) {
    setMapData({
      avgRate: 4,
      title: "Cool map!",
      author: "Alex",
    });
  }

  // TODO: Add nav to display page once implemented
  return (
    <Card
      className="m-3 "
      style={{ width: `${cardWidth}%` }}
      onClick={handleRouteToViewMapPage}
    >
      <MapRenderer
        Geometry={mapData.mapFile}
        GraphicData={mapData}
        width="100%"
        height="300px"
      />
      <RatingDisplay value={mapData.avgRate} />
      <Card.Body
        className=""
        style={{ backgroundColor: "#141488", color: "white" }}
      >
        <Card.Title>{mapData.title ?? "Loading..."}</Card.Title>
        <Card.Text>by {mapData.author ?? "Loading..."}</Card.Text>
      </Card.Body>
    </Card>
  );
}

