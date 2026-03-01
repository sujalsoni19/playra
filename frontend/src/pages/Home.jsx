import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Feed from "../components/Feed.jsx";

function Home() {
  return (
    <div className="self-start gap-2 w-full h-[85vh] flex p-2">
      <div className="border p-2 rounded-xl custom-scrollbar overflow-y-auto h-full border-cyan-400 hidden lg:flex lg:flex-col lg:w-1/6">
        <Sidebar />
      </div>

      <div className="border p-2 rounded-xl border-cyan-400 w-full lg:w-5/6">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
