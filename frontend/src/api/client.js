import axios from "axios";

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

if (!BASE && !import.meta.env.DEV) {
  throw new Error("VITE_API_URL is missing in production build");
}

const api = axios.create({
  baseURL: BASE || "http://localhost:3001/api", // dev에서만 로컬
  withCredentials: false, // 쿠키 인증 안 쓰면 false
});

export default api;
