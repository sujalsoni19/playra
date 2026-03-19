import React from "react";
import { NavLink } from "react-router";

const navClass = ({ isActive }) => `${isActive && "underline text-cyan-400"}`;

function ChannelNavbar({ id }) {
  return (
    <div>
      <div className="flex gap-5 sm:gap-8 font-semibold border-b p-2 border-gray-700">
        <NavLink
          to={`/channel/${id}`} end
          className={navClass}
        >
          Home
        </NavLink>
        <NavLink to={`/channel/${id}/videos`} className={navClass}>
          Videos
        </NavLink>
        <NavLink to={`/channel/${id}/playlists`} className={navClass}>
          Playlists
        </NavLink>
        <NavLink to={`/channel/${id}/posts`} className={navClass}>
          Posts
        </NavLink>
        <NavLink to={`/channel/${id}/about`} className={navClass}>
          About
        </NavLink>
      </div>
    </div>
  );
}

export default ChannelNavbar;
