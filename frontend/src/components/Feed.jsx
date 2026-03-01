import React from "react";
import Videocard from "./Videocard";

function Feed() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 my-2 custom-scrollbar overflow-y-auto h-full w-full">
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
      <Videocard />
    </div>
  );
}

export default Feed;
