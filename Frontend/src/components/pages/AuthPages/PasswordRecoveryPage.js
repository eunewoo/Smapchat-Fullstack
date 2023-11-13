import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import Logo from "../../../assets/images/logo2.png";

const PasswordRecoveryPage = () => {
  const navigate = useNavigate();
  const handleRouteToHome = () => navigate("/");

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center w-100">
        <Col md={7} className="mx-auto text-center">
          <div className="text-center">
            <img src={Logo} alt="Logo" width="220" />
          </div>
          <Card
            className="login-card text-center mx-auto my-4"
            style={{
              backgroundColor: "white",
              borderRadius: "14px",
              maxWidth: "90%",
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
                Welcome Back!
              </Card.Title>
            </Card.Body>
          </Card>
          <div className="text-white mb-4">
            Forgot your password? Don’t worry, it happens to the best of us.
            Just enter your registered email address below, and we'll send you
            instructions on how to reset it.
          </div>
          <Form className="login-form" style={{ maxWidth: "40%" }}>
            <Form.Group className="mb-3" controlId="formBasicRecoveryEmail">
              <Form.Control type="email" placeholder="Recovery E-Mail" />
            </Form.Group>

            <Button
              className="btn btn-2 mx-auto mb-5"
              size="lg"
              type="submit"
              onClick={handleRouteToHome}
            >
              Send Reset Instructions
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordRecoveryPage;
