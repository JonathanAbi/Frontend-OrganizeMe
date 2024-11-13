import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Button from "../Button";
import styles from "./hero.module.css";
import AOS from 'aos';

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true,
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#242424", padding: "80px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={5} md={12} className="text-lg-start text-center" data-aos="fade-right">
              <h1
                className={`fw-bold ${styles.customfs}`}
                style={{ color: "#FFFFFF" }}
              >
                Simplify Your Tasks, Boost Your Productivity!
              </h1>
              <p
                className="fs-4"
                style={{ color: "#B3B3B3", margin: "20px 0" }}
              >
                Organize your daily tasks efficiently with <b>OrganizeMe</b>,
                the ultimate task management app for everyone.
              </p>
              <Button size="lg" className={`${styles.customButton}`}>
                Start for Free
              </Button>
            </Col>
            <Col lg={7} md={12} className="text-center mt-4 mt-lg-0" data-aos="fade-left">
              <Image
                src="/dashboard.png"
                alt="Dashboard Preview"
                style={{ borderRadius: "10px" }}
                fluid
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#2c3035", padding: "40px 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6} data-aos="zoom-out-up">
              <h2 style={{ fontSize: "2.5rem", color: "#FFFFFF" }}>
                Take Control of Your Productivity with Ease
              </h2>
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#B3B3B3",
                  marginTop: "20px",
                }}
              >
                Say goodbye to scattered notes and overwhelming task lists.
                Welcome a smarter way to organize your day and achieve your
                goals effortlessly.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
