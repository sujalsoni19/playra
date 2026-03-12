import api from "./axios.js";

export const postVideo = (data) => api.post("/api/v1/videos/post-video", data);

export const getAllVideos = (params) =>
  api.get("/api/v1/videos/all-videos", { params });

export const getVideo = (id) => api.get(`/api/v1/videos/video/${id}`);
