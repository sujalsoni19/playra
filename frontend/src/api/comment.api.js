import api from "./axios.js";

export const createComment = (videoId, data) =>
  api.post(`/api/v1/videos/${videoId}/comments`, data);

export const getAllComments = (videoId) =>
  api.get(`/api/v1/videos/${videoId}/comments`);

export const deleteComment = (videoId, commentId) =>
  api.delete(`/api/v1/videos/${videoId}/comments/${commentId}`);

export const updateComment = (videoId, commentId, data) => 
  api.patch(`/api/v1/videos/${videoId}/comments/${commentId}`, data);
