import React, { useState, useEffect } from "react";
import Videocard from "../components/Videocard.jsx";
import { getWatchHistory } from "../api/user.api";
import Loader from "../components/Loader.jsx";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getWatchHistory();
        setHistory(res.data?.data || []);
      } catch (error) {
        console.log("error in fetching videos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  return history.length == 0 ? (
    <div className="h-full flex justify-center items-center">
      <h1 className="text-3xl">No videos available</h1>
    </div>
  ) : (
    <div className="py-4 flex flex-col gap-3">
      <h1 className="text-3xl pl-4 font-semibold">Watch History</h1>
      <p className="text-sm text-gray-400 pl-4">Most recent first</p>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center xl:grid-cols-3  custom-scrollbar overflow-y-auto h-full w-full">
        {history.map((video) => (
          <Videocard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
