import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { motion } from "motion/react";
import { toggleSubscription } from "../api/subscriber.api.js";
import { getUserChannelProfile } from "../api/user.api.js";

function SubscriberCard({ channel }) {
  const [subscribersCount, setSubscribersCount] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);

  const toggleSubscribe = async () => {
    try {
      const res = await toggleSubscription(channel?.channel?._id);
      loadStats();
    } catch (error) {
      console.log("error in toggling subscription: ", error);
    }
  };

  const loadStats = async () => {
    try {
      const username = channel?.channel?.username;

      const res = await getUserChannelProfile(username);
      setSubscribersCount(res?.data?.data?.subscribersCount);
      setIsSubscribed(res?.data?.data?.isSubscribed);
    } catch (error) {
      console.log("error fetching stats:", error);
    }
  };

  useEffect(() => {
    if (channel?.channel?.username) {
      loadStats();
    }
  }, [channel]);

  const isLoading = subscribersCount === null;

  return (
    <div className="flex justify-betweensm:px-5 items-center">
      <NavLink to={`/channel/${channel?.channel?.username}`} className="flex-1">
        <div className="py-2 items-center flex gap-2 sm:gap-5">
          <img
            src={channel?.channel?.avatar?.url || channel?.channel?.avatar}
            alt="avatar"
            className="w-20 h-20 sm:w-35 sm:h-35 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-base sm:text-xl font-semibold">
              {channel?.channel?.fullName}
            </h1>

            <h1 className="text-xs sm:text-base">
              @{channel?.channel?.username}
            </h1>

            {isLoading ? (
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
            ) : (
              <h1 className="text-xs sm:text-base">
                {subscribersCount} subscribers
              </h1>
            )}
          </div>
        </div>
      </NavLink>
      <div>
        <motion.button
          key={isSubscribed}
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
            isSubscribed ? "bg-[#22D3EE] text-white" : "bg-white text-black"
          }`}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </motion.button>
      </div>
    </div>
  );
}

export default SubscriberCard;
