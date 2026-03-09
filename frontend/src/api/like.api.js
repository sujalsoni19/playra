import api from "./axios.js";

export const toggleVideoLike = (videoId) =>
  api.post(`/api/v1/likes/video/${videoId}`);

export const toggleCommentLike = (commentId) =>
  api.post(`/api/v1/likes/comment/${commentId}`);
