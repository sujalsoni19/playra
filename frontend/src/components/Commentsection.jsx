import React, { useEffect, useState } from "react";
import { getAllComments } from "../api/comment.api.js";
import { toggleCommentLike } from "../api/like.api.js";
import { ThumbsUpIcon, SquarePen, Trash2 } from "lucide-react";
import { useUsercontext } from "../context/UserContext.jsx";

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }

  return "just now";
};

function Commentsection({ videoId }) {
  const [comments, setComments] = useState([]);
  const { user } = useUsercontext();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await getAllComments(videoId);
        console.log(res?.data?.data?.docs);
        setComments(res?.data?.data?.docs);
        console.log(user);
      } catch (error) {
        console.log("error in fetching all comments: ", error);
      }
    };

    getComments();
  }, []);

  const handleToggleCommentLike = async (commentId) => {
    try {
      await toggleCommentLike(commentId);

      setComments((comments) =>
        comments.map((c) =>
          c._id === commentId
            ? {
                ...c,
                isLiked: !c.isLiked,
                likeCount: c.likeCount + (c.isLiked ? -1 : 1),
              }
            : c,
        ),
      );
    } catch (error) {
      console.log("error toggling comment like:", error);
    }
  };

  return (
    <div className="mt-6 bg-pink-300 py-5">
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3 items-center">
            <img
              src={comment?.owner?.avatar?.url}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-1 flex-col gap-1 bg-green-400">
              <div className="flex gap-2 items-center">
                <h1>@{comment?.owner?.username}</h1>
                <p className="text-xs text-gray-300">
                  {timeAgo(comment?.createdAt)}
                </p>
              </div>
              <div>
                <p>{comment?.content}</p>
              </div>
              <div className="flex gap-1 items-center">
                {" "}
                <button
                  onClick={() => handleToggleCommentLike(comment._id)}
                  className="hover:bg-gray-700 hover:cursor-pointer hover:rounded-full p-2"
                >
                  {comment?.isLiked ? (
                    <ThumbsUpIcon size={20} fill="cyan" />
                  ) : (
                    <ThumbsUpIcon size={20} />
                  )}
                </button>
                {comment.likeCount}
              </div>
            </div>
            {user?._id === comment?.owner?._id && (
              <div className=" bg-pink-400 flex p-2 gap-2">
                <button className="hover:bg-gray-700 hover:cursor-pointer hover:rounded-full p-2">
                  <SquarePen size={18} />
                </button>
                <button className="hover:bg-gray-700 hover:cursor-pointer hover:rounded-full p-2">
                  <Trash2 color="red" size={18} />
                </button>
              </div>
            )}
          </div>

          //  <div key={comment._id} className='flex gap-5 items-center'>
          //     <img
          //     src={comment?.owner?.avatar?.url}
          //     alt="avatar"
          //     className="w-12 h-12 bg-red-500 rounded-full"
          //   />
          //   <div className='flex flex-col gap-1 bg-green-400'>
          //     <div className='flex gap-1'>
          //         <h1>@{comment?.owner?.username}</h1>
          //         <p className='text-sm text-gray-300'>{comment.createdAt}</p>
          //     </div>
          //     <div><p>{comment.content}</p></div>
          //     <div> </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default Commentsection;
