import React, { useEffect } from "react";
import ChannelBox from "../components/Channel/ChannelBox.jsx";
import ChannelNavbar from "../components/Channel/ChannelNavbar.jsx";
import { getAllVideosbyUser } from "../api/video.api.js";
import { getUserChannelProfile } from "../api/user.api.js";
import { useState } from "react";   
import { Outlet, useParams } from "react-router";

function ChannelPage() {
  const { id } = useParams();

   const [channel, setChannel] = useState(null);
   const [videos, setVideos] = useState([]);

   const fetchChannelInfo = async () => {
      try {
        const res = await getUserChannelProfile(id);
        setChannel(res?.data?.data);
      } catch (error) {
        console.log("error in fetching channel info: ", error);
      }
    };

  useEffect(() => {
    if (id) {
      fetchChannelInfo();
    }
  }, [id]);

  useEffect(() => {

    if (!channel?._id) return;

    const fetchAllVideosbyUser = async () => {
      try {
        const res = await getAllVideosbyUser(channel?._id);
        setVideos(res?.data?.data);
      } catch (error) {
        console.log("error in fetching all videos of user: ", error);
      }
    };

    fetchAllVideosbyUser();
  }, [channel?._id]);

  return (
    <div>
      <ChannelBox channel={channel}  videoCount={videos?.length} fetchUserChannelProfile={fetchChannelInfo} />
      <ChannelNavbar id={id} />
      <Outlet context={{ videos, channel }} />
    </div>
  );
}

export default ChannelPage;
