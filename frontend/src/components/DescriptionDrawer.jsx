import { useState } from "react";
import { motion } from "motion/react";
import { formatDate } from "./Videocard.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

function DescriptionDrawer({ video }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className={`w-full mt-4 sm:mt-8 bg-slate-700 ${open ? "" : "hover:bg-slate-600"} hover:cursor-pointer rounded-xl p-4 text-black`}
    >
      <div className="flex justify-between items-center ">
        <p className="text-sm text-slate-300 font-semibold">
          {video?.views} views • {formatDate(video?.createdAt)}
        </p>
        <button className="text-sm font-semibold">
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <motion.p
        layout
        className={`text-sm text-slate-400 mt-3 whitespace-pre-line ${
          open ? "block" : "hidden"
        }`}
      >
        {video?.description}
      </motion.p>
    </div>
  );
}

export default DescriptionDrawer;
