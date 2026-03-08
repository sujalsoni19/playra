import React, { useState } from "react";
import { useUsercontext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "../api/comment.api.js";

const schema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(300, "Comment too long"),
});

function Comments({ videoId }) {
  const [isActive, setisActive] = useState(false);
  const { user } = useUsercontext();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onComment = async (data) => {
    try {
      const res = await createComment(videoId, {
        content: data.comment,
      });
      reset();
      setisActive(false);
    } catch (error) {
      console.log("error in creating comment: ", error);
    }
  };
  return (
    <div className="mt-6 rounded-2xl flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold">12 Comments</h1>
      </div>
      <form onSubmit={handleSubmit(onComment)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar?.url}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <textarea
            {...register("comment")}
            onFocus={() => setisActive(true)}
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                setisActive(false);
              }
            }}
            placeholder="Add a Comment..."
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            rows={1}
            className="outline-0 border-b border-gray-200 text-sm w-full py-2 resize-none overflow-hidden"
          ></textarea>
        </div>
        {isActive && (
          <div className="flex gap-5 self-end">
            <button
              type="button"
              onClick={() => {
                reset();
                setisActive(false);
              }}
              className="px-4 py-2 rounded-3xl hover:bg-gray-700 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 rounded-3xl hover:cursor-pointer bg-cyan-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Comments;
