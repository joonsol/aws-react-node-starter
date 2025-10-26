// frontend/src/api/client.js
import axios from "axios";

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

if (!BASE && !import.meta.env.DEV) {
  // 프로덕션에선 반드시 설정되어야 함
  throw new Error("VITE_API_URL is missing in production build");
}

export default axios.create({
  baseURL: BASE || "http://localhost:3001/api", // dev만 로컬 보정
  withCredentials: false, // 쿠키 인증 안 쓰면 false
});
