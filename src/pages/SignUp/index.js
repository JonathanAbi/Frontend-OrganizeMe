import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import FormSignUp from "./form";
import styles from "./signup.module.css";
import api from "../../api/api";
import { toast, Bounce } from "react-toastify";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mutation untuk signup
  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true)
      console.log("Mutation started");
      const response = await api.post("/api/auth/signup", formData);
      console.log("Mutation finished");
      setIsLoading(false)
      return response;
    },
    onSuccess: (response) => {
      if (response.data) {
        navigate(`/auth/signup/verify-user?email=${form.email}`);
      }
    },
    onError: (error) => {
      setIsLoading(false)
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
    signupMutation.mutate(form);
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#1a1a1a';
    return () => {
      document.body.style.backgroundColor = ''; // Kembali ke default saat komponen dilepas
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
              <Card.Title className="fs-2 fw-bold text-center">
                Create an Account
              </Card.Title>
              <FormSignUp
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
