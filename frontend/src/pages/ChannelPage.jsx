import React, { useEffect } from "react";
import ChannelBox from "../components/ChannelBox";
import { getAllVideosbyUser } from "../api/video.api.js";
import { getUserChannelProfile } from "../api/user.api.js";
import { useState } from "react";   
import { useParams } from "react-router";

function ChannelPage() {
  const { id } = useParams();

   const [channel, setChannel] = useState(null);
   const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const res = await getUserChannelProfile(id);
        console.log(res?.data?.data);
        setChannel(res?.data?.data);
      } catch (error) {
        console.log("error in fetching channel info: ", error);
      }
    };

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
        console.log(res);
      } catch (error) {
        console.log("error in fetching all videos of user: ", error);
      }
    };

    fetchAllVideosbyUser();
  }, [channel?._id]);

  return (
    <div>
      <ChannelBox channel={channel}  videoCount={videos?.length} />
    </div>
  );
}

export default ChannelPage;
