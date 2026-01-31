import React from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

function Home() {
  return (
    <div className="self-start gap-2 w-full h-[85vh] flex p-2">
      <Sidebar />
      <div className="bg-red-500 border p-2 rounded-xl border-cyan-400 w-full lg:w-5/6">
        hii
      </div>
    </div>
  );
}

export default Home;
