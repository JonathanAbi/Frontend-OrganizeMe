import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "../Button";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export default function NavbarComponent({ isLandingPage = false }) {
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
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="#home">OrganizeMe</Navbar.Brand>
        {isLandingPage ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button
                  onClick={() => navigate("/auth/signin")}
                  className={"mx-2"}
                  variant="#F97316"
                >
                  Log in
                </Button>
                <Button onClick={() => navigate("/auth/signup")}>
                  Get Started
                </Button>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav className="ms-auto">
            <Button onClick={handleLogout} variant="outline-danger" class>
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

NavbarComponent.propTypes = {
  isLandingPage: PropTypes.bool,
};
