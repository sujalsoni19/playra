import React, { use, useEffect, useState } from "react";
import Videocard from "./Videocard";
import Loader from "./Loader.jsx";
import { getAllVideos } from "../api/video.api.js";

function Feed() {
  const [allVideos, setallVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchallVideos = async () => {
      try {
        const res = await getAllVideos();
        setallVideos(res.data?.data?.docs || []);
        console.log("all videos: ", res.data?.data?.docs);
      } catch (error) {
        console.log("error in fetching videos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchallVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  return allVideos.length == 0 ? (
    <div className="h-full flex justify-center items-center">
      <h1 className="text-3xl">No videos available</h1>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 my-2 custom-scrollbar overflow-y-auto h-full w-full">
      {allVideos.map((video) => (
        <Videocard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Feed;
