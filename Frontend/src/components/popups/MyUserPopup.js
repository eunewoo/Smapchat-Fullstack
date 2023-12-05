import { Button, Card, Container, Image, Form, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import "./UserPopup.css";
import "./CommonPopup.css";
import { BsXLg } from "react-icons/bs";
import { popContext } from "../../App";
import AuthContext from "../../contexts/AuthContext";
import avatar from "../../assets/images/avatar.png";
import DeleteUserPopup from "./DeleteUserPopup";
import { updateUserProfile } from "../../util/userUtil";

export default function UserPopup(props) {
  const { auth, setAuth, logoutUser } = useContext(AuthContext);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const setPop = useContext(popContext);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(auth.user.username);
  const [email, setEmail] = useState(auth.user.email);
  const [updatedUser] = useState({ ...auth.user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    var newUser = auth.user;
    newUser.username = username;
    newUser.email = email;
    await updateUserProfile(newUser);

  };

  const handleLogout = () => {
    setPop(null);
    logoutUser();
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
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </Form.Group>

        <div className="delete-button-container">
          <Button variant="danger" onClick={() => setShowDeletePopup(true)}>
            Delete Account
          </Button>
        </div>

        {/* Avatar and image buttons */}
        <Col>
          <Image
            className="avatar"
            src={
              updatedUser.avatar === "" || updatedUser.avatar === null
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

      {showDeletePopup && (
        <DeleteUserPopup onClose={() => setShowDeletePopup(false)} />
      )}
    </Card>
  );
}
