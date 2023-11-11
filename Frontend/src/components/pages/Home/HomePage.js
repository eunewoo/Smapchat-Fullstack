import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        {/* remove className when you add maps */}
        <Col md={8} className="bg-primary ">
          Display Maps
        </Col>
        {/* remove className when you add display settings */}

        <Col md={3} className="bg-secondary">
          settings
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
