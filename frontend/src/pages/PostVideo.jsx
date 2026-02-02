import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postVideo } from "../api/video.api.js";
import UploadOverlay from "../components/UploadOverlay.jsx";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title should be less than 50 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(50, { message: "Description should be less than 300 characters" }),
  isPublished: z.string().transform((val) => val === "true"),
  thumbnail: z
    .instanceof(File, { message: "Thumbnail is required" })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Thumbnail must be under 2MB",
    )
    .refine(
      (file) => ["image/png", "image/jpeg"].includes(file.type),
      "Only PNG or JPG allowed",
    ),

  videoFile: z
    .instanceof(File, { message: "Video is required" })
    .refine(
      (file) => file.size <= 100 * 1024 * 1024,
      "Video must be under 100MB",
    )
    .refine((file) => file.type.startsWith("video/"), "Invalid video format"),
});

function PostVideo() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [serverError, setServerError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isPublished: "true",
    },
  });

  const formsubmit = async (data) => {
    try {
      setServerError("");
      setUploadStatus("loading");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isPublished", data.isPublished);
      formData.append("thumbnail", data.thumbnail);
      formData.append("videoFile", data.videoFile);

      setUploadStatus("success");

      const res = await postVideo(formData);
      console.log(res);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);

      setThumbnailPreview(null);
      setVideoPreview(null);
      reset();

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setServerError(message);
      setUploadStatus("error");
    }
  };

  return (
    <div className="self-start py-6 my-2 border rounded-2xl border-gray-700  w-full mx-6">
      <UploadOverlay
        status={uploadStatus}
        errorMessage={serverError}
        onClose={() => setUploadStatus("idle")}
      />
      <div className="text-center text-cyan-400 mt-2 mb-4 text-3xl">
        Upload Video
      </div>
      <form onSubmit={handleSubmit(formsubmit)}>
        <div className="gap-5 mx-4 flex flex-col lg:flex-row mb-8">
          <div className="lg:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title(Max. 50 characters):</label>
              <input
                type="text"
                id="title"
                placeholder="Enter a suitable title"
                className="p-2 border border-cyan-400 w-[90%] rounded-xl px-4"
                {...register("title")}
              />
              <p className="text-red-600 text-sm">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">
                Description(Max. 300 charaacters):
              </label>
              <textarea
                id="description"
                placeholder="Tell viewers about your video"
                className="p-2 border border-cyan-400 w-[90%] rounded-xl custom-scrollbar px-4"
                rows="10"
                {...register("description")}
              />
              <p className="text-red-600 text-sm">
                {errors.description?.message}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="status">Status (public by default):</label>

              <select
                id="status"
                {...register("isPublished")}
                className="bg-gray-900 text-cyan-400 border border-cyan-400 rounded-md px-2 py-1"
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="thumbnail">Thumbnail:</label>

                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/png, image/jpeg"
                      className="
            rounded-xl border border-cyan-400 bg-[#0B0B0C] w-full px-2 py-2
            text-sm text-zinc-300
            file:mr-4 file:rounded-full file:border-0
            file:bg-cyan-500 file:px-4 file:py-1
            file:text-sm file:font-semibold file:text-white
            hover:file:bg-cyan-400
            cursor-pointer
            transition-colors
          "
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        setThumbnailPreview((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return URL.createObjectURL(file);
                        });

                        field.onChange(file);
                      }}
                    />
                  )}
                />
                <p className="text-red-600 text-sm">
                  {errors.thumbnail?.message}
                </p>
              </div>

              <div className="mt-1 sm:w-[50%]">
                <div className="h-40 w-full rounded-xl border border-cyan-400 bg-[#0B0B0C] flex items-center justify-center overflow-hidden">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <p className="text-sm text-zinc-500">
                      Thumbnail preview will appear here
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="videoFile">Video:</label>

                <Controller
                  name="videoFile"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/mp4, video/webm, video/ogg"
                      className="
            rounded-xl border border-cyan-400 bg-[#0B0B0C] w-full px-2 py-2
            text-sm text-zinc-300
            file:mr-4 file:rounded-full file:border-0
            file:bg-cyan-500 file:px-4 file:py-1
            file:text-sm file:font-semibold file:text-white
            hover:file:bg-cyan-400
            cursor-pointer
            transition-colors
          "
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        setVideoPreview((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return URL.createObjectURL(file);
                        });

                        field.onChange(file);
                      }}
                    />
                  )}
                />
                <p className="text-red-600 text-sm">
                  {errors.videoFile?.message}
                </p>
              </div>

              <div className="mt-1 sm:w-[50%]">
                <div className="h-40 w-full rounded-xl border border-cyan-400 bg-[#0B0B0C] flex items-center justify-center overflow-hidden">
                  {videoPreview ? (
                    <video
                      src={videoPreview}
                      alt="Video preview"
                      controls
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="text-sm text-zinc-500">
                      Video preview will appear here
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center flex">
          <button
            type="submit"
            className="px-4 py-2 border bg-gray-800 rounded-full hover:scale-110 hover: cursor-pointer border-cyan-400 focus-visible:border-cyan-300 active:bg-gray-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostVideo;
