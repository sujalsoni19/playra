import React, { useState } from "react";
import { deleteComment, updateComment } from "../api/comment.api.js";
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

function Commentsection({ videoId, comments, setComments }) {
  const { user } = useUsercontext();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

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

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(videoId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log("error while deleting comment:", error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await updateComment(videoId, commentId, {
        content: editText,
      });

      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                content: editText,
                updatedAt: new Date(),
              }
            : c,
        ),
      );

      setEditingId(null);
    } catch (error) {
      console.log("error updating comment:", error);
    }
  };

  if (!comments || comments.length === 0) {
    return <p className="text-center">No comments yet</p>;
  }

  return (
    <div className="mt-6 py-5">
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-1 sm:gap-3 items-start">
            <img
              src={comment?.owner?.avatar?.url}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />

            {editingId === comment._id ? (
              <div className="flex flex-col gap-2 flex-1">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  rows={1}
                  className="border-b border-gray-300 outline-0 resize-none overflow-hidden"
                />

                <div className="flex self-end gap-3">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 rounded-full hover:cursor-pointer hover:bg-gray-700"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleUpdateComment(comment._id)}
                    disabled={!editText.trim()}
                    className="px-4 py-2 rounded-3xl hover:cursor-pointer bg-cyan-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <h1>@{comment?.owner?.username}</h1>

                    <p className="text-[10px] sm:text-xs text-gray-400">
                      {timeAgo(comment.createdAt)}
                      {comment.updatedAt !== comment.createdAt && (
                        <span className="ml-1">(edited)</span>
                      )}
                    </p>
                  </div>

                  <p>{comment?.content}</p>

                  <div className="flex gap-1 items-center">
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
                  <div className="flex sm:p-2 sm:gap-2">
                    <button
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditText(comment.content);
                      }}
                      className="hover:bg-gray-700 hover:cursor-pointer hover:rounded-full p-2"
                    >
                      <SquarePen size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="hover:bg-gray-700 hover:cursor-pointer hover:rounded-full p-2"
                    >
                      <Trash2 color="red" size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commentsection;
