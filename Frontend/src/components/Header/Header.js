import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Logo from "../../assets/images/Logo1.png";
import UserAvatar from "../../assets/images/userAvatar.png";
import AuthContext from "../../contexts/AuthContext";
import "./Header.css";

const Header = () => {
  // states, contexts, and variables
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = auth.loggedIn;
  const authPages =
    location.pathname === "/login-page" ||
    location.pathname === "/signup-page" ||
    location.pathname === "/password-recovery-page";

  //functions
  const handleNavigateToLogin = () => navigate("/login-page");
  const handleNavigateToSignup = () => navigate("/signup-page");

  if (authPages) {
    console.log("nulls");
    return null;
  }
  return (
    <Navbar
      className="navbar"
      expand="lg"
      style={{ backgroundColor: "#0C0D34" }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} width="300" height="auto" alt="Logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link
            as={NavLink}
            to="/"
            className="me-5 text-white"
            style={{ fontSize: "1.2em" }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/create-page"
            className="me-5 text-white"
            style={{ fontSize: "1.2em" }}
          >
            Create
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/element-demo"
            className="me-5 text-white"
            style={{ fontSize: "1.2em" }}
          >
            My Maps
          </Nav.Link>
        </Nav>
        {!isLoggedIn && (
          <>
            <Button
              onClick={handleNavigateToSignup}
              type="button"
              className="transparent-button btn  px-3 py-1 rounded-3 fw-bold ms-3"
            >
              Sign up
            </Button>
            <Button
              onClick={handleNavigateToLogin}
              type="button"
              className="btn transparent-button px-3 py-1 rounded-3 fw-bold ms-3"
            >
              Log in
            </Button>
          </>
        )}

        {isLoggedIn && (
          <>
            <Button
              onClick={handleNavigateToSignup}
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
