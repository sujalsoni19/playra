import api from "./axios.js";

export const fetchSubscribers = () =>
  api.get("/api/v1/subscriptions/channels");