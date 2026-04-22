"use client";

import Link from "next/link";

const mockPosts = [
  { id: 1, title: "Bán nhà Hà Nội", price: "3 tỷ" },
  { id: 2, title: "Chung cư mini", price: "1.2 tỷ" },
];

export default function UserPosts() {
  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá tin này?");
    if (!confirmDelete) return;

    console.log("Delete post:", id);
  };

  return (
    <div>
      <h1>Tin đã đăng</h1>

      <Link href="/user/post/create">+ Đăng tin</Link>

      <div style={{ marginTop: 20 }}>
        {mockPosts.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{post.title}</h3>
              <p>{post.price}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: 10 }}>
              <Link href={`/user/post/${post.id}`}>
                <button style={{ cursor: "pointer" }}>✏️ Sửa</button>
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                🗑️ Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}