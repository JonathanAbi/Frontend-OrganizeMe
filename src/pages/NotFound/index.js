import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    console.log("NotFound page loaded");
    document.body.style.backgroundColor = "#1a1a1a";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);

  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", textAlign: "center", color: "white" }}
    >
      <h1 className="display-1" style={{ fontWeight: "bold" }}>
        404
      </h1>
      <p className="lead">Page Not Found</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </Container>
  );
}
