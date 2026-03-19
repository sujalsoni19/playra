import React from "react";
import { useOutletContext } from "react-router";
import Videocard from "../Videocard.jsx";

function ChannelHome() {
  const { videos, channel } = useOutletContext();

  const popularVideos = videos
    ? [...videos].sort((a, b) => b.views - a.views).slice(0, 3)
    : [];

  return videos.length == 0 ? (
    <div className="h-full py-10 flex justify-center items-center">
      <h1 className="text-2xl">No videos available</h1>
    </div>
  ) : (
    <div className="p-2 flex flex-col gap-3">
      <div>
        <h1 className="text-xl font-semibold">Featured Videos:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 my-2 custom-scrollbar overflow-y-auto h-full w-full">
          {videos.slice(0, 3).map((video) => (
            <Videocard key={video._id} video={video} variant="channel" />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Popular Videos:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 my-2 custom-scrollbar overflow-y-auto h-full w-full">
          {popularVideos.map((video) => (
            <Videocard key={video._id} video={video} variant="channel" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelHome;
