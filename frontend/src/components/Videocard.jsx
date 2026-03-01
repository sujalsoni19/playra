import React from "react";
import { motion } from "motion/react";
import playra from "../../public/playra.png";
import { DotIcon } from "lucide-react";

function Videocard() {
  return (
    <div>
      <motion.div
        initial={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "transparent",
        }}
        whileHover={{
          cursor: "pointer",
          backgroundColor: "rgb(79 79 79 / 60%)",
        }}
        transition={{ duration: 0.3 }}
        className="w-80 md:w-85 lg:w-90 flex flex-col items-center gap-1 rounded-2xl p-2"
      >
        <div className="relative">
          <img
            src={playra}
            alt=""
            className="w-82.5 aspect-video rounded-2xl object-cover"
          />
          <p className="bg-gray-950 p-1 text-xs absolute right-4 bottom-3">
            14:03
          </p>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-10 h-10 shrink-0">
            <img
              src={playra}
              alt=""
              className="object-cover object-center w-full h-full rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-sm line-clamp-2 ">
              FIRST EVER VIDEO eisgdffsreeefd dwqqqrfr ijnudijnle wudwe
            </h1>
            <p className="text-sm line-clamp-1">sujal soni</p>
            <div className="flex text-gray-300">
              <p className="text-xs">2m views</p>
              <p>
                <DotIcon />
              </p>
              <p className="text-xs">3 months ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Videocard;
