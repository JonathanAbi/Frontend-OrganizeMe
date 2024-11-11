import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#242424",
        padding: "40px 0",
        color: "#FFFFFF",
      }}
    >
      <Container>
        <Row className="text-center">
          <Col className="mb-1">
            <h6 className="fw-bold">Follow Us</h6>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
                style={{ color: "#A0AEC0" }}
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
                style={{ color: "#A0AEC0" }}
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#A0AEC0" }}
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>

          </Col>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <p style={{ fontSize: "0.8rem", color: "#A0AEC0" }}>
              © 2024 OrganizeMe. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
