import api from "./axios.js";

export const toggleVideoLike = (videoId) =>
    api.post(`/api/v1/likes/video/${videoId}`);