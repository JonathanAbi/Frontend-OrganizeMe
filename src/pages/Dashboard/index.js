import React, { useEffect } from "react";
import NavbarComponent from "../../components/Navbar";

export default function index() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1a1a1a";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);
  return <NavbarComponent />;
}
