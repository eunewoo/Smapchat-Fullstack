import { useContext, useState } from "react";
import { Image, Card, Container, Button, Dropdown } from "react-bootstrap";
import { popContext } from "../../App";
import "./Customer.css";
import UserPopup from "../popups/UserPopup";
import defaultAvatar from "../../assets/images/avatar.png";
import { deleteUser } from "../../util/userUtil";

export default function Customer(props) {
  const setPop = useContext(popContext);
  const [isBanned, setIsBanned] = useState(false);

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${props.userData.username}?`
    );
    if (isConfirmed) {
      console.log(`Deleting user: ${props.userData.username}`);
      
    }
  };

  const handleBan = () => {
    console.log(`Banning user: ${props.userData.username}`);
    setIsBanned(true);
  };

  const handleActivate = () => {
    console.log(`Activating user: ${props.userData.username}`);
    setIsBanned(false);
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
            style={{ width: "fit-content" }}
          >
            Status
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleDelete}
              style={{ width: "fit-content" }}
              className="redButton mb-2 rounded-3"
            >
              Delete
            </Dropdown.Item>
            {isBanned ? (
              <Dropdown.Item
                onClick={handleActivate}
                style={{
                  width: "fit-content",
                  // textAlign: "center",
                }}
                className="bg-success ms-3 text-white rounded-2"
              >
                Activate
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={handleBan}
                className="redButton rounded-2"
                style={{ width: "fit-content" }}
              >
                Deactivate
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Card>
  );
}
