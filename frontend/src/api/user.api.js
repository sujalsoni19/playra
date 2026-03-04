import api from "./axios.js";

export const registerUser = (data) =>
  api.post("/api/v1/users/register", data);

export const loginUser = (data) =>
  api.post("/api/v1/users/login", data);

export const logoutUser = () =>
  api.post("/api/v1/users/logout")

export const getCurrentUser = () =>
  api.get("/api/v1/users/current-user");

export const getUserChannelProfile = (username) =>
  api.get(`/api/v1/users/c/${username}`);
