import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVideo } from "../api/video.api.js";
import { ThumbsUp, ThumbsDown } from "lucide-react";

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async (id) => {
      try {
        const res = await getVideo(id);
        console.log(res?.data?.data);
        setVideo(res?.data?.data);
      } catch (error) {
        console.log("Error while fetching video: ", error);
      }
    };
    fetchVideo(id);
  }, []);
  return (
    <div className="flex self-stretch w-full flex-1">
      <div className="grid w-full grid-cols-6 gap-4 p-2">
        <div className="col-span-4 py-1 px-3 rounded-2xl bg-gray-800">
          <video
            src={video.videoFile?.url}
            controls
            className="w-full rounded-2xl aspect-video"
          ></video>
          <div className="my-2 flex flex-col gap-3 bg-green-400">
            <h1 className="text-3xl">{video.title}</h1>
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 rounded-full bg-red-200">
                <img
                  src={video.owner?.avatar?.url}
                  alt="avatar"
                  className="object-cover object-center w-full h-full rounded-full"
                />
              </div>
              <div className="bg-blue-500 gap-5 items-center flex flex-1">
                <div className="flex flex-col">
                  <h1 className="text-xl">{video.owner?.username}</h1>
                  <p className="text-gray-300 text-sm">238 subscribers</p>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white rounded-full text-black font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 flex gap-2 py-2 bg-white rounded-full text-black font-semibold">
                  <ThumbsUp />
                  220
                </button>
                <button className="px-4 py-2 bg-white rounded-full text-black font-semibold">
                  <ThumbsDown />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 border border-cyan-300 rounded-2xl bg-pink-400">
          Sidebar
        </div>
      </div>
    </div>
  );
}

export default Video;
