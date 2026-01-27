import React from "react";
import Hero from "../components/Hero.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-hero animate-hero" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Hero />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
