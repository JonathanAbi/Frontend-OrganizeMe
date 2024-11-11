import React, { useEffect } from "react";
import NavbarComponent from "../../components/Navbar";
import Hero from "../../components/Hero";
import FeaturesSection from "../../components/FeaturesSection";
import Footer from "../../components/Footer";

export default function LandingPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1E1E1E";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);
  return (
    <>
      <NavbarComponent isLandingPage={true} />
      <Hero/>
      <FeaturesSection/>
      <Footer/>
    </>
  );
}
