import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001", // EC2 배포 시 변경
  withCredentials: true,
});

export default api;
