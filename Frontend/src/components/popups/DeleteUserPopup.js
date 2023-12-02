import React, { useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { deleteUser } from "../../util/userUtil"; // Adjust the path as necessary

function DeleteUserPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirmDelete = async () => {
    try {
      console.log("email", email);
      await deleteUser({ email, password });
      // Add additional logic if needed, such as logging the user out
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error (e.g., show a message to the user)
    }
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
        <Card.Title>Delete Account</Card.Title>
        <BsXLg className="close" onClick={onClose}></BsXLg>
      </Card.Body>

      <Container>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Container>
      <Button className="button" onClick={handleConfirmDelete}>
        Confirm Delete
      </Button>
    </Card>
  );
}

export default DeleteUserPopup;
