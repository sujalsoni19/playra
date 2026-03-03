import api from "./axios.js";

export const postVideo = (data) => 
    api.post("/api/v1/videos/post-video", data);

export const getAllVideos = () =>
    api.get("/api/v1/videos/all-videos");

export const getVideo = (id) =>
    api.get(`/api/v1/videos/video/${id}`)