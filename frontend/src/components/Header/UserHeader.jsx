import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useUsercontext } from "../../context/UserContext.jsx";
import { Plus, Search, Menu, ArrowLeft } from "lucide-react";
import { logoutUser } from "../../api/user.api.js";

function UserHeader() {
  const { user, setUser } = useUsercontext();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleChange = (e) => {
      if (e.matches) {
        setShowSearch(false);
      }
    };

    if (mediaQuery.matches) {
      setShowSearch(false);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("error is:", error);
    }
  };

  return (
    <div className="my-2 p-1 shadow-[4px_2px_5px_0px_#4fd1c5] border border-[#a7a7a7] mx-auto w-[90vw] rounded-4xl">
      {showSearch ? (
        <div className="flex items-center justify-around">
          <button
            onClick={() => setShowSearch(false)}
            className="hover:cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <div className="flex justify-end items-center">
            <input
              type="text"
              placeholder="search..."
              className="bg-gray-900 outline-0  text-cyan-400 rounded-r-none focus:inset-ring focus:inset-ring-cyan-400  w-[80%] rounded-full py-1 px-5 "
            />
            <span className="px-2 flex w-[15%] bg-gray-700 py-2 hover:cursor-pointer h-full rounded-r-full  justify-center items-center">
              <span className="flex text-cyan-400 items-center">
                <Search />
              </span>
            </span>
          </div>
        </div>
      ) : (
        <nav className="flex items-center gap-2 md:gap-5 lg:gap-15 xl:gap-30 justify-between px-4">
          <span className="sm:hidden">
            <Menu />
          </span>
          <div className="text-3xl">
            <Link to={user ? "/home" : "/"}>
              <img src={logo} alt="Logo" className="w-30 sm:w-40" />
            </Link>
          </div>
          <div className="sm:flex-1 flex items-center">
            <input
              type="text"
              placeholder="search..."
              className="bg-gray-900 outline-0 hidden sm:block text-cyan-400 rounded-r-none focus:inset-ring focus:inset-ring-cyan-400  w-full rounded-full py-2 px-5 "
            />
            {/* // for mobile */}
            <span
              onClick={() => setShowSearch(true)}
              className="px-2 sm:hidden bg-gray-700 py-2 hover:cursor-pointer h-full rounded-full sm:rounded-r-full flex justify-center items-center"
            >
              <span className="flex text-cyan-400 items-center">
                <Search />
              </span>
            </span>
            {/* // for bigger screens */}
            <span className="px-2 hidden sm:flex w-[15%] bg-gray-700 py-2 hover:cursor-pointer h-full rounded-r-full  justify-center items-center">
              <span className="flex text-cyan-400 items-center">
                <Search />
              </span>
            </span>
          </div>
          <div className="flex gap-2 sm:gap-6">
            <button
              onClick={() => navigate("/register")}
              className="p-2 sm:px-6 flex gap-1 items-center sm:py-2 rounded-full bg-cyan-500 text-white font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300 ring-1 ring-white/20 text-sm sm:text-xl hover:cursor-pointer"
            >
              <Plus />
              <span className="hidden sm:block">Create</span>
            </button>
            <button
              onClick={logout}
              className="hover:cursor-pointer font-bold hidden sm:block text-sm sm:text-xl"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

export default UserHeader;
