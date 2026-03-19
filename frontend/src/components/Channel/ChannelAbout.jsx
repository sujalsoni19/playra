import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getChannelStats } from "../../api/user.api.js";
import Loader from "../Loader.jsx";
import { formatDate } from "../Videocard.jsx";

function ChannelAbout() {
  const { channel } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(12345678);

  useEffect(() => {
    if (!channel?._id) return;

    const fetchChannelStats = async () => {
      try {
        const res = await getChannelStats(channel._id);
        setStats(res?.data?.data);
      } catch (error) {
        console.log("error fetching user channel stats: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelStats();
  }, [channel?._id]);

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-6 py-2">
      <h2 className="text-xl font-semibold mb-3">About this channel</h2>

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 leading-none">
              <span className="w-6 text-center">📺</span>
              <span className="font-semibold">{stats.videoCount}</span>
              <span className="text-sm text-gray-400">Videos</span>
            </div>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 leading-none">
              <span className="w-6 text-center">👀</span>
              <span className="font-semibold">
                {stats.viewCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">Views</span>
            </div>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 leading-none">
              <span className="w-6 text-center">❤️</span>
              <span className="font-semibold">
                {stats.likeCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">Likes</span>
            </div>
          </div>
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 leading-none">
              <span className="w-6 text-center">👥</span>
              <span className="font-semibold">
                {stats.subscriberCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">Subscribers</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No stats available</p>
      )}

      <div className="mt-3 p-4 border border-gray-700 rounded-lg flex items-center gap-2 leading-none">
        <span className="text-gray-400 text-sm">📅</span>
        <span className="text-gray-400 text-sm">Joined</span>
        <span className="font-medium">{formatDate(channel?.createdAt)}</span>
      </div>
    </div>
  );
}

export default ChannelAbout;
