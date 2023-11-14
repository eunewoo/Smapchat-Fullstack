import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "./styles.css";
import Logo from "../../../assets/images/logo2.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const handleRouteToHome = () => navigate("/");

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center w-100">
        <Col md={6} className="mx-auto text-center">
          <div className="text-center">
            <img src={Logo} alt="Logo" width="220" />
          </div>
          <Card
            className="login-card text-center mx-auto my-4"
            style={{
              backgroundColor: "white",
              borderRadius: "14px",
            }}
          >
            <Card.Body>
              <Card.Title
                className="p-0 m-0"
                style={{
                  color: "#0C0D34",
                  fontSize: "32px",
                  fontWeight: "900",
                }}
              >
                Welcome to Smapchat!
              </Card.Title>
            </Card.Body>
          </Card>
          <Form className="login-form mb-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="E-Mail" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicRepeatPassword">
              <Form.Control type="password" placeholder="Repeat Password" />
            </Form.Group>

            <Button
              className="btn login-btn mx-auto"
              size="lg"
              type="submit"
              onClick={handleRouteToHome}
            >
              Register
            </Button>
          </Form>
          <div className="account-section">
            <div className="text-white">
              Already have an account:{" "}
              <Link to="/login-page" style={{ color: "blue" }}>
                Login
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
