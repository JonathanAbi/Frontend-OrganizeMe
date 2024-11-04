import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import FormSignIn from "./form";
import styles from "./signin.module.css";
import api from "../../api/api";
import { toast, Bounce } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Cek apakah token ada di localStorage pada saat komponen dimuat
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/dashboard/");
    }
  }, [navigate]);

  useEffect(() => {
    document.body.style.backgroundColor = "#1a1a1a";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signinMutation = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      console.log("Mutation started");
      const response = await api.post("/api/auth/signin", formData);
      console.log("Mutation finished");
      setIsLoading(false);
      return response;
    },
    onSuccess: (response) => {
      console.log(response.data);
      if (response.data) {
        login({
          username: response.data.data.username,
          email: response.data.data.email,
          token: response.data.data.token,
        });
        toast.success(`Hello ${response.data.data.username}`, {
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
        navigate("/dashboard/");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      if (error.response && error.response.status === 429) {
        toast.error(
          error.response.data ||
            "Too many login attempts, please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      } else {
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
    signinMutation.mutate(form);
  };
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
