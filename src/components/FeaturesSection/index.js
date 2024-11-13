import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaBell, FaClipboardList, FaMobileAlt, FaTasks } from "react-icons/fa";
import AOS from "aos";

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <div style={{ backgroundColor: "#2c3035" }}>
      <Container style={{ maxWidth: "900px" }}>
        <Row className="text-center">
          <Col lg={6} md={6} className="mb-3" data-aos="flip-up">
            <FaTasks color="white" size={50} />
            <h5 className="fw-bold" style={{ color: "#FFFFFF" }}>
              Organize your tasks effortlessly
            </h5>
            <p style={{ color: "#B3B3B3" }}>
              Easily manage your tasks by organizing them into priorities and
              due dates. Stay focused on what matters most.
            </p>
          </Col>
          <Col lg={6} md={6} className="mb-3" data-aos="flip-up">
            <FaClipboardList color="white" size={50} />
            <h5 className="fw-bold" style={{ color: "#FFFFFF" }}>
              Add important details to your tasks
            </h5>
            <p style={{ color: "#B3B3B3" }}>
              Attach descriptions, files, or notes to each task for better
              clarity and improved collaboration.
            </p>
          </Col>
          <Col lg={6} md={6} className="mb-3" data-aos="flip-up">
            <FaMobileAlt color="white" size={50} />
            <h5 className="fw-bold" style={{ color: "#FFFFFF" }}>
              Access your tasks from anywhere
            </h5>
            <p style={{ color: "#B3B3B3" }}>
              With our responsive design, manage your tasks seamlessly on any
              device—desktop, tablet, or mobile.
            </p>
          </Col>
          <Col lg={6} md={6} className="mb-3" data-aos="flip-up">
            <FaBell color="white" size={50} />
            <h5 className="fw-bold" style={{ color: "#FFFFFF" }}>
              Never miss a deadline again
            </h5>
            <p style={{ color: "#B3B3B3" }}>
              Set reminders for your tasks and stay updated on upcoming
              deadlines to ensure you never fall behind.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
