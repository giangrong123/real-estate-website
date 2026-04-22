"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Đang tải tin tức...</p>;

  return (
    <div>
      <h2>Tin tức mới</h2>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "15px" }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}