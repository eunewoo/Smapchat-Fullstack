import { useContext } from "react";
import { Image, Card, Container, Button } from "react-bootstrap";
import { popContext } from "../../App";
import "./Customer.css";
import UserPopup from "../popups/UserPopup";

export default function Customer(props) {
  const setPop = useContext(popContext);
  return (
    <Card className="my-2">
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
        <Image className="Avatar" src={props.userData.avatar} roundedCircle />
        <Button
          className="button"
          onClick={() => setPop(<UserPopup user={props} />)}
        >
          View Profile
        </Button>
        <Button className="button">View Maps</Button>
        <Button variant="danger" className="redButton">
          Ban
        </Button>
      </Container>
    </Card>
  );
}
