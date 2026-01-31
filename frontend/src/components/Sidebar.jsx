import { ChevronRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import GithubLogo from "../assets/Github.svg";
import LinkedinLogo from "../assets/Linkedin.svg";
import { primaryLinks, secondaryLinks } from "../data/sidebarLinks.js";

const navLinkClass = ({ isActive }) =>
  ` flex items-center gap-4 rounded-full py-2 px-3
  bg-gray-800 hover:bg-gray-700 transition-colors
  ${isActive && "underline text-cyan-400"} `;

function Sidebar() {
  return (
    <div className="border p-2 rounded-xl h-full border-cyan-400 hidden lg:flex lg:flex-col lg:w-1/6">
      <div className="p-2 flex flex-col gap-3">
        {primaryLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.id} to={item.to} className={navLinkClass}>
              <Icon />
              {item.title}
            </NavLink>
          );
        })}
      </div>
      <div className="w-full border"></div>
      <div className="p-2 flex flex-1 bg-amber-300 flex-col gap-2">
        <NavLink
          to={"/subscriptions"}
          className={({ isActive }) =>
            `${isActive && "underline text-cyan-400"} flex items-center gap-4 rounded-full py-2 px-3 bg-gray-800 hover:bg-gray-700`
          }
        >
          Subscriptions
          <ChevronRight />
        </NavLink>
        <div>
          {/* List of subscriptions can go here */}
          <p className="text-sm text-gray-400">No subscriptions yet.</p>
        </div>
      </div>
      <div className="w-full border"></div>
      <div className="p-2 flex flex-col gap-3">
        {secondaryLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.id} to={item.to} className={navLinkClass}>
              <Icon />
              {item.title}
            </NavLink>
          );
        })}
      </div>
      <div className="w-full border"></div>
      <div className="p-2 flex gap-5 items-center">
        Follow us on:
        <div className="flex gap-3 items-center">
          <a
            href="https://github.com/sujalsoni19"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GithubLogo} className="w-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/sujal-soni19/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkedinLogo} className="w-7" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
