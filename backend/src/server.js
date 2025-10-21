// backend/src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// 로컬 테스트 CORS (리버스프록시 쓰면 제거 가능)
app.use(cors({ 
  origin: ["http://localhost:5173"], 
  credentials: true
 }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

let posts = [{ id: 1, title: "Hello AWS", body: "First post" }];
app.get("/api/posts", (req, res) => res.json(posts));
app.post("/api/posts", (req, res) => {
  const { title, body } = req.body || {};
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const created = { id, title, body };
  posts.push(created);
  res.status(201).json(created);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on :${PORT}`));


app.get("/", (req, res) => {
  res.send("✅ Backend server is running on port 3001");
});
