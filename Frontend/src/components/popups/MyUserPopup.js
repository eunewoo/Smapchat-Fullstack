import {
  Button,
  Card,
  Container,
  Image,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useContext, useState } from "react";
import "./UserPopup.css";
import "./CommonPopup.css";
import { BsXLg } from "react-icons/bs";
import { popContext } from "../../App";
import AuthContext from "../../contexts/AuthContext";
import avatar from "../../assets/images/avatar.png";

export default function UserPopup(props) {
  const { auth, setAuth, logoutUser } = useContext(AuthContext);

  const setPop = useContext(popContext);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...auth.user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    // TODO: Implement API call to update user data on the server
    // Assuming API call is successful, update the context and local storage
    setAuth({ ...auth, user: updatedUser });
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...auth, user: updatedUser })
    );
  };

  const handleLogout = () => {
    setPop(null);
    logoutUser();
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

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
        <Card.Title>Personal Information</Card.Title>
        <BsXLg className="close" onClick={() => setPop(null)}></BsXLg>
      </Card.Body>
      <Container>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={updatedUser.username}
            name="username"
            onChange={handleChange}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={updatedUser.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        {/* Avatar and image buttons */}
        <Col>
          <Image
            className="avatar"
            src={
              updatedUser.avatar == "" || updatedUser.avatar == null
                ? avatar
                : updatedUser.avatar
            }
            roundedCircle
          />
        </Col>

        <div className="text-end mt-3">
          {isEditing && <Button className="m-3">Password</Button>}
          {isEditing && <Button>Delete Image</Button>}
          <Button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className="m-3"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </Card>
  );
}
