import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVideo } from "../api/video.api.js";
import { getUserChannelProfile } from "../api/user.api.js";
import { toggleSubscription } from "../api/subscriber.api.js";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "motion/react";
import Loader from "../components/Loader.jsx";

function Video() {
  const { id } = useParams();
  const [username, setUsername] = useState(null);
  const [video, setVideo] = useState(null);
  const [channelinfo, setChannelinfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const res = await getVideo(id);
        const videoData = res?.data?.data;

        setVideo(videoData);
        setUsername(videoData?.owner?.username);
      } catch (error) {
        console.log("Error while fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const fetchUserChannelProfile = async () => {
    try {
      const res = await getUserChannelProfile(username);
      setChannelinfo(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log("error in fetching user channel profile:", error);
    }
  };

  useEffect(() => {
    if (!username) return;

    fetchUserChannelProfile();
  }, [username]);

  const toggleSubscribe = async () => {
    try {
      const res = await toggleSubscription(channelinfo?._id);
      console.log(res);
      fetchUserChannelProfile();
    } catch (error) {
      console.log("error in toggling subscription: ", error);
    }
  };

  if (!video || loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

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
                  <p className="text-gray-300 text-sm">
                    {channelinfo?.subscribersCount}{" "}
                    <span className="ml-2">subscribers</span>
                  </p>
                </div>
                <motion.button
                  key={channelinfo?.isSubscribed}
                  onClick={toggleSubscribe}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`px-5 py-2 rounded-full font-semibold ${
                    channelinfo?.isSubscribed
                      ? "bg-cyan-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {channelinfo?.isSubscribed ? "Subscribed" : "Subscribe"}
                </motion.button>
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
