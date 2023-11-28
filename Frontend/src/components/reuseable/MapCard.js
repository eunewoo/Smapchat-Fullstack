import { useEffect, useState, useContext } from "react";
import MapRenderer from "./MapRenderer";
import RatingDisplay from "./RatingDisplay";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { userProfile } from "../../util/userUtil";
// Added to bring userId that used in saving rate data
import { AuthContext } from "../../contexts/AuthContext";
import "./MapCard.css";

export default function MapCard(props) {
  // The map data that this card is displaying
  const [mapData] = useState(props.mapData);
  const [mapUser, setMapUser] = useState(null);
  const numberOfColumns = props.numberOfColumns;

  const { auth } = useContext(AuthContext);
  const userId = auth.user?._id;

  const navigate = useNavigate();

  let cardWidth = 45;

  if (numberOfColumns === 2) {
    cardWidth = 45;
  } else if (numberOfColumns === 3) {
    cardWidth = 30;
  }

  useEffect(() => {
    if (mapData.owner != null)
      userProfile(mapData.owner).then((val) => setMapUser(val));
    else setMapUser({ username: "Unknown" });
  }, [mapData]);

  const handleRouteToViewMapPage = () =>
    navigate(`/view-map-page/${mapData._id}`);

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
      <RatingDisplay
        userId={userId}
        mapId={props.mapData._id}
        value={props.mapData.avgRate}
        from="map-card"
      />{" "}
      <Card.Body
        className=""
        style={{ backgroundColor: "#0C0D34", color: "white" }}
      >
        <Card.Title>{mapData.title ?? "Loading..."}</Card.Title>
        <Card.Text>
          by {mapUser?.username ?? "Loading..."} on {mapData.date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
