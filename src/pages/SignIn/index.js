import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import FormSignIn from "./form";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
  };
  return (
    <Container
      
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center"> {/* w-100 menyesuaikan dengan lebar elemen pembungkus terdekatnya */}
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          {" "}
          {/* Mengatur ukuran kolom sesuai ukuran layar */}
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="fs-1 fw-bold text-center">
                Login
              </Card.Title>
              <FormSignIn
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
