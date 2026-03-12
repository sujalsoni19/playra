import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVideo } from "../api/video.api.js";
import { getUserChannelProfile } from "../api/user.api.js";
import { toggleSubscription } from "../api/subscriber.api.js";
import { toggleVideoLike } from "../api/like.api.js";
import { ThumbsUp } from "lucide-react";
import { motion } from "motion/react";
import Loader from "../components/Loader.jsx";
import Comments from "../components/Comments.jsx";
import SidebarVideoFeed from "../components/SidebarVideoFeed.jsx";
import DescriptionDrawer from "../components/DescriptionDrawer.jsx";

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
        console.log(videoData);
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
      fetchUserChannelProfile();
    } catch (error) {
      console.log("error in toggling subscription: ", error);
    }
  };

  const handleToggleVideoLike = async () => {
    try {
      const res = await toggleVideoLike(id);
      setVideo((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
      }));
    } catch (error) {
      console.log("error in toggling like:", error);
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
      <div className="sm:grid  w-full grid-cols-6 gap-8 lg:gap-4 p-2">
        <div className="col-span-6 lg:col-span-4 py-1 pb-4 px-3 h-fit self-start rounded-2xl bg-[#0F172A]">
          <video
            src={video.videoFile?.url}
            controls
            className="w-full rounded-2xl aspect-video"
          ></video>
          <div className="my-1 mx-2 flex flex-col gap-3">
            <h1 className="text-xl sm:text-3xl font-semibold">{video.title}</h1>
            <div className="flex gap-2 sm:gap-5 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                <img
                  src={video.owner?.avatar?.url}
                  alt="avatar"
                  className="object-cover object-center w-full h-full rounded-full"
                />
              </div>
              <div className="gap-5 items-center flex flex-1">
                <div className="flex flex-col">
                  <h1 className="text-md sm:text-xl">
                    {video.owner?.username}
                  </h1>
                  <p className="text-gray-300 flex text-sm">
                    {channelinfo?.subscribersCount}{" "}
                    <span className="ml-1">subscribers</span>
                  </p>
                </div>
                <motion.button
                  key={channelinfo?.isSubscribed}
                  onClick={toggleSubscribe}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#06B6D4",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`px-2 sm:px-5 py-2 rounded-full text-[#0F172A] text-xs sm:text-base font-semibold ${
                    channelinfo?.isSubscribed
                      ? "bg-[#22D3EE] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {channelinfo?.isSubscribed ? "Subscribed" : "Subscribe"}
                </motion.button>
              </div>
              <div className="flex gap-2">
                <motion.button
                  key={video?.isLiked}
                  onClick={handleToggleVideoLike}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#1E293B",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="px-3 sm:px-4 flex gap-2 py-2 bg-[#020617] rounded-full text-white font-semibold"
                >
                  {video?.isLiked ? <ThumbsUp fill="#22D3EE" /> : <ThumbsUp />}
                  {video?.likesCount}
                </motion.button>
              </div>
            </div>
          </div>
          <DescriptionDrawer video={video} />
          <Comments videoId={video._id} />
        </div>
        <div className="col-span-6 overflow-y-auto lg:col-span-2 bg-[#030918] rounded-2xl h-fit self-start">
          <SidebarVideoFeed videoId={video._id} />
        </div>
      </div>
    </div>
  );
}

export default Video;
