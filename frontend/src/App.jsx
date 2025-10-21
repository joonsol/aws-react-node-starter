import { useEffect, useState } from "react";
import api from "./api/client";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/api/posts");
        setPosts(data);
      } catch (err) {
        console.error("API 연결 실패:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 AWS React Node Starter</h1>
      <p>백엔드 연결 테스트</p>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.body}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
