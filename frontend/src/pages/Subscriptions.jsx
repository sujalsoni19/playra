import React, { useState, useEffect } from "react";
import { fetchSubscribers } from "../api/subscriber.api.js";
import SubscriberCard from "../components/SubscriberCard.jsx";

function Subscriptions() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchSubscribersData = async () => {
      try {
        const res = await fetchSubscribers();
        setChannels(res.data?.data?.channels || []);
      } catch (error) {
        console.log("error in fetching subscribed channels:", error);
      }
    };

    fetchSubscribersData();
  }, []);
  return channels.length == 0 ? (
    <div className="h-full py-10 flex flex-col justify-center items-center">
      <h1 className="text-base sm:text-2xl text-center">
        Your are not subscribed to any channels.
      </h1>
      <h1 className="text-base sm:text-2xl text-center">
        Start subscribing to channels to see them here.
      </h1>
    </div>
  ) : (
    <div className="p-4 sm:p-8 flex flex-col gap-3">
      <div>
        <h1 className="text-3xl font-semibold">All subscriptions</h1>
      </div>
      <div className="flex flex-col gap-2">
        {channels.map((channel) => (
            <SubscriberCard key={channel?._id} channel={channel}/>
        ))}
      </div>
      
    </div>
  );
}

export default Subscriptions;
