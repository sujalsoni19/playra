import React, { useState, useEffect } from "react";
import { getAllVideos } from "../api/video.api.js";
import Videocard from "./Videocard.jsx";

function SidebarVideoFeed({ videoId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await getAllVideos({ page: 1, limit: 11 });
      setVideos(res.data?.data?.docs || []);
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 p-2">
      {videos
        .filter((v) => v._id !== videoId)
        .map((video) => (
          <Videocard key={video._id} video={video} variant="sidebar" />
        ))}
    </div>
  );
}

export default SidebarVideoFeed;
