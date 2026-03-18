import React, { useEffect, useState } from "react";

function ChannelBox({ channel, videoCount }) {
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
      <div className="flex items-center p-4 gap-8 ">
        <img
          src={channel?.avatar?.url || channel?.avatar}
          alt="avatar"
          className="w-40 h-40 rounded-full"
        />
        <div className="gap-1 flex flex-col">
          <h1 className="text-4xl font-semibold">{channel?.fullName}</h1>
          <h1>@{channel?.username}</h1>
          <div className="flex items-center gap-4">
            <p>{channel?.subscribersCount} subscribers </p> 
            <span>•</span>
            <p>{videoCount} videos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelBox;
