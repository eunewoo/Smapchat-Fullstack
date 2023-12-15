import { useContext } from "react";
import { Image, Card, Container, Button } from "react-bootstrap";
import { popContext } from "../../App";
import "./Customer.css";
import UserPopup from "../popups/UserPopup";
import defaultAvatar from "../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";

export default function Customer(props) {

  const setPop = useContext(popContext);
  const navigate = useNavigate();

  return (
    <Card className="my-2" style={{width: "80%"}}>
      <Card.Body
        style={{
          backgroundColor: "#0C0D34",
          color: "white",
          height: "40px",
          padding: "5px",
        }}
      >
        <Card.Title>{props.userData.username ?? "Loading..."}</Card.Title>
      </Card.Body>

      <Container>
        <Image 
          className="Avatar" 
          src={props.userData.avatar} 
          onError={({target}) => target.src = defaultAvatar}
          roundedCircle />
        <Button
          className="button"
          onClick={() => setPop(<UserPopup user={props} />)}
        >
          View Profile
        </Button>
        <Button 
          className="button"
          onClick={() => navigate(`/my-maps-page/${props.userData._id}`)}>
          View Maps
        </Button>
        <Button variant="danger" className="button">
          Ban
        </Button>
        <Button variant="danger" className="button">
          Make Admin
        </Button>
      </Container>
    </Card>
  );
}
