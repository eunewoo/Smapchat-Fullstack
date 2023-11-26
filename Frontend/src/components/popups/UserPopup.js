import { Card, Container, Image } from "react-bootstrap";
import { useContext } from "react";
import "./UserPopup.css";
import "./CommonPopup.css";
import { BsXLg } from "react-icons/bs";
import { popContext } from "../../App";

export default function UserPopup(props) {
  const setPop = useContext(popContext);

  return (
    <Card className="popup">
      <Card.Body
        style={{
          backgroundColor: "#0C0D34",
          color: "white",
          height: "40px",
          padding: "5px",
        }}
      >
        <Card.Title>Customer Information</Card.Title>
        <BsXLg className="close" onClick={() => setPop(null)}></BsXLg>
      </Card.Body>

      <Container>
        <Image className="avatar" src={props.user.userData.avatar} roundedCircle />
        <div className="box">{props.user.userData.username}</div>
        <div className="box">{props.user.userData.email}</div>
      </Container>
    </Card>
  );
}
