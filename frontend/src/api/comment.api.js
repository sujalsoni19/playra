import api from "./axios.js";

export const createComment = (videoId, data) =>
  api.post(`/api/v1/videos/${videoId}/comments`, data);
