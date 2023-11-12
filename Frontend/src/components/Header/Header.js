import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Logo from "../../assets/images/Logo1.png";
import UserAvatar from "../../assets/images/userAvatar.png";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleNavigateTo = () => navigate("/create-page");
  
  console.log(auth);
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#0C0D34" }}>
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} width="300" height="auto" alt="Logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" className="me-5 text-white">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/create-page" className="me-5 text-white">
            Create
          </Nav.Link>
          <Nav.Link as={NavLink} to="/my-maps-page" className="me-5 text-white">
            My Maps
          </Nav.Link>
        </Nav>
        <Button
          onClick={handleNavigateTo}
          type="button"
          className="btn btn-primary px-4 py-2 rounded-3 fw-bold ms-3"
          style={{ backgroundColor: "#4ACEFF" }}
        >
          Login
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
