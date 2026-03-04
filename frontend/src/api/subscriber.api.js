import api from "./axios.js";

export const fetchSubscribers = () =>
  api.get("/api/v1/subscriptions/channels");

export const toggleSubscription = (channelId) =>
  api.post(`/api/v1/subscriptions/${channelId}`, { channelId });