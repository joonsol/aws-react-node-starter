import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// ✅ .env의 ALLOWED_ORIGINS 사용 (쉼표구분)
const allowlist = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// ⚠️ 쿠키 인증을 안 쓰면 credentials:false가 훨씬 단순합니다.
app.use(cors({
  origin: (origin, cb) => {
    // 서버-서버 요청 등 origin이 없는 경우 허용
    if (!origin) return cb(null, true);
    cb(null, allowlist.includes(origin));
  },
  credentials: false,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔎 ALB 헬스체크 경로(대상그룹에 동일하게 '/api/health' 설정)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// 샘플 API
let posts = [{ id: 1, title: "Hello AWS", body: "First post" }];
app.get("/api/posts", (req, res) => res.json(posts));
app.post("/api/posts", (req, res) => {
  const { title, body } = req.body || {};
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const created = { id, title, body };
  posts.push(created);
  res.status(201).json(created);
});

// ✅ PORT는 .env로 통일 (3001)
const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => console.log(`API on :${PORT}`));

// (선택) 루트 응답도 PORT값 사용
app.get("/", (req, res) => {
  res.send(`✅ Backend server is running on port ${PORT}`);
});
