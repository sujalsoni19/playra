import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="my-2 p-1  shadow-[4px_2px_5px_0px_#4fd1c5] border border-[#a7a7a7] mx-auto w-[90vw] rounded-4xl">
      <nav className="flex items-center sm:gap-40 justify-between sm:justify-around">
        <div className="text-3xl">
            <Link to="/"><img src={logo} alt="Logo" className="w-30 sm:w-50" /></Link>
          
        </div>
        <div className="flex gap-2 sm:gap-15">
          <button
            onClick={() => navigate("/login")}
            className="hover:cursor-pointer font-bold text-sm sm:text-xl"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="p-2 sm:px-8 sm:py-3 rounded-full bg-cyan-500 text-white font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300 ring-1 ring-white/20 text-sm sm:text-xl hover:cursor-pointer"
          >
            Register
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
