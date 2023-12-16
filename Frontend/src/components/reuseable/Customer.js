import { useContext } from "react";
import { Image, Card, Container, Button, Dropdown } from "react-bootstrap";
import { popContext } from "../../App";
import "./Customer.css";
import UserPopup from "../popups/UserPopup";
import defaultAvatar from "../../assets/images/avatar.png";

export default function Customer(props) {
  const setPop = useContext(popContext);
  const handleDelete = () => {
    console.log(`Deleting user: ${props.userData.username}`);
  };

  const handleBan = () => {
    console.log(`Banning user: ${props.userData.username}`);
  };
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

      <Container className="d-flex align-items-center">
        <Image
          className="Avatar"
          src={props.userData.avatar}
          onError={({ target }) => (target.src = defaultAvatar)}
          roundedCircle
        />
        <Button
          className="button"
          onClick={() => setPop(<UserPopup user={props} />)}
        >
          View Profile
        </Button>
        <Button className="button">View Maps</Button>
        {/* <Button variant="danger" className="redButton">
          Ban
        </Button> */}
        <Dropdown className="mr-2">
          <Dropdown.Toggle
            variant="danger"
            id="dropdown-basic"
            className="mr-2"
          >
            Edit
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={handleBan} className="redButton">
              Ban
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Card>
  );
}
