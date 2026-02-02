import api from "./axios.js";

export const postVideo = (data) => 
    api.post("/api/v1/videos/post-video", data);