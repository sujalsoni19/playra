import React from "react";
import { motion } from "motion/react";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Videocard({video}) {
  return (
    <div>
        <Link to={`/video/${video._id}`}>
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
        onClick={{}}
        className="w-80 md:w-85 lg:w-90 flex flex-col items-center gap-1 rounded-2xl p-2"
      >
        <div className="relative">
          <img
            src={video.thumbnail?.url}
            alt="thumbnail"
            className="w-82.5 aspect-video rounded-2xl object-cover"
          />
          <p className="bg-gray-950 p-1 text-xs absolute right-4 bottom-3">
            {formatDuration(video.duration)}
          </p>
        </div>
        <div className="flex w-full p-2 gap-2 ">
          <div className="w-10 h-10 shrink-0">
            <img
              src={video.owner?.avatar?.url}
              alt="avatar"
              className="object-cover object-center w-full h-full rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-base line-clamp-2 ">
              {video.title}
            </h1>
            <p className="text-sm line-clamp-1">{video.owner.username}</p>
            <div className="flex items-center text-gray-300">
              <p className="text-xs">{video.views} views</p>
              <p>
                <Dot />
              </p>
              <p className="text-xs">{formatDate(video.createdAt)}</p>
            </div>
          </div>
        </div>
      </motion.div>
        </Link>
    </div>
  );
}

export default Videocard;
