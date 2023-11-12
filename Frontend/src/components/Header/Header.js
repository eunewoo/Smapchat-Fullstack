import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Logo from "../../assets/images/Logo1.png";
import UserAvatar from "../../assets/images/userAvatar.png";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  // states, contexts, and variables
  const [menu, setMenu] = useState(false);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const isLoggedIn = auth.loggedIn;

  //functions
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
        {!isLoggedIn && (
          <Button
            onClick={handleNavigateTo}
            type="button"
            className="btn btn-primary px-4 py-2 rounded-3 fw-bold ms-3"
            style={{ backgroundColor: "#4ACEFF" }}
          >
            Login
          </Button>
        )}

        {isLoggedIn && (
          <>
            <Button
              onClick={handleNavigateTo}
              type="button"
              className="btn btn-primary px-4 py-2 rounded-3 fw-bold mx-3"
              style={{ backgroundColor: "#4ACEFF" }}
            >
              Eunewoo
            </Button>
            <img
              src={UserAvatar}
              alt="User Avatar"
              style={{ width: "45px", height: "45px", borderRadius: "15%" }}
            />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
