import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import styles from "./otp.module.css";
import FormOtp from "./form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

export default function index() {
  const location = useLocation();
  // Mengambil parameter query dari URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: email,
    otpCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const otpMutation = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      console.log("Mutation started");
      const response = await api.put("/api/auth/verify-user", formData);
      console.log("Mutation finished");
      setIsLoading(false);
      return response;
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Verify success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/auth/signin");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      if (error.response) {
        toast.error(error?.response?.data?.msg || "Internal server error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    },
  });

  const handleSubmit = () => {
    otpMutation.mutate(form);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#1a1a1a";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        {/* w-100 menyesuaikan dengan lebar elemen pembungkus terdekatnya */}
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          {/* Mengatur ukuran kolom sesuai ukuran layar */}
          <Card className={`p-4 shadow ${styles.customCard}`}>
            <Card.Body>
              <Card.Title className="fs-1 fw-bold text-center">
                Confirm OTP
              </Card.Title>
              <Card.Title className="fs-5 text-center">
                Enter the OTP we just sent
              </Card.Title>
              <FormOtp
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
