import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "../Button";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NavbarComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/auth/signin");
      }
    });
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">OrganizeMe</Navbar.Brand>
        <Button onClick={handleLogout} variant="outline-danger">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
