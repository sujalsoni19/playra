import React from 'react'
import { useOutletContext } from 'react-router';
import Videocard from '../Videocard.jsx';

function ChannelVideos() {
 const { videos, channel } = useOutletContext();

  return videos.length == 0 ? (
    <div className="h-full py-10 flex justify-center items-center">
      <h1 className="text-base sm:text-2xl text-center">This channel hasn't uploaded any videos yet</h1>
    </div>
  ) : (
    <div className="p-2 flex flex-col gap-3">
      <div>
        <h1 className="text-xl font-semibold">All Videos:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 my-2 custom-scrollbar overflow-y-auto h-full w-full">
          {videos.map((video) => (
            <Videocard key={video._id} video={video} variant="channel" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelVideos
