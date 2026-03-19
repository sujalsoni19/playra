import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toggleSubscription } from "../../api/subscriber.api.js";

function ChannelBox({ channel, videoCount, fetchUserChannelProfile }) {

  const toggleSubscribe = async () => {
      try {
        const res = await toggleSubscription(channel?._id);
        fetchUserChannelProfile();
      } catch (error) {
        console.log("error in toggling subscription: ", error);
      }
    };

  return (
    <div>
      {channel?.coverImage && (
        <div className="relative w-full h-32 md:h-36 lg:h-40 overflow-hidden rounded-xl">
          <img
            src={channel?.coverImage?.url || channel?.coverImage}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={channel?.coverImage?.url || channel?.coverImage}
              alt="cover"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
      <div className="flex items-center p-2 sm:p-4 gap-3 sm:gap-8 ">
        <img
          src={channel?.avatar?.url || channel?.avatar}
          alt="avatar"
          className="w-25 h-25 sm:w-35 sm:h-35 rounded-full"
        />
        <div className="gap-1 sm:gap-2 flex flex-col">
          <h1 className="text-xl sm:text-4xl font-semibold">{channel?.fullName}</h1>
          <h1 className="text-sm sm:text-base">@{channel?.username}</h1>
          <div className="flex items-center text-sm sm:text-base gap-2 sm:gap-4">
            <p>{channel?.subscribersCount} subscribers </p> 
            <span>•</span>
            <p>{videoCount} videos</p>
          </div>
           <div>
              <motion.button
                  key={channel?.isSubscribed}
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
                    channel?.isSubscribed
                      ? "bg-[#22D3EE] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                </motion.button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelBox;
