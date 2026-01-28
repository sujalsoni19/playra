import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router";

import "./App.css";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      <div className="absolute inset-0 bg-hero animate-hero" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
