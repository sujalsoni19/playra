import React, { useEffect, useState } from "react";
import { fetchSubscribers } from "../api/subscriber.api.js";
import { NavLink } from "react-router-dom";
import { navLinkClass } from "./Sidebar.jsx";

function SubscribedchannelsList() {
  const [channelsList, setChannelsList] = useState([]);

  useEffect(() => {
    const fetchSubscribersData = async () => {
      try {
        const res = await fetchSubscribers();
        setChannelsList(res.data?.data?.channels || []);
      } catch (error) {
        console.log("error in fetching subscribed channels:", error);
      }
    };

    fetchSubscribersData();
  }, []);

  return channelsList.length === 0 ? (
    <div>
      <div className=" flex flex-col gap-1">
        <div className="flex items-center gap-4 rounded-full py-2 px-3">
          No subscriptions yet.
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className=" flex flex-col gap-1">
        {channelsList.slice(0, 3).map((item) => {
          return (
            <NavLink
              key={item.channel?._id}
              to={`/@${item.channel?.username}`}
              className={navLinkClass}
            >
              <div className="bg-red-600 w-8 h-8 rounded-full">
                <img
                  src={item.channel?.avatar?.url || item.channel?.avatar}
                  alt="avatar"
                  className="object-cover object-center w-full h-full rounded-full"
                />
              </div>

              {item.channel?.username.length > 15
                ? `${item.channel?.username.slice(0, 15)}...`
                : item.channel?.username}
            </NavLink>
          );
        })}
        {channelsList.length > 3 && (
          <p className="text-md mt-3 text-gray-400">and more...</p>
        )}
      </div>
    </div>
  );
}

export default SubscribedchannelsList;
