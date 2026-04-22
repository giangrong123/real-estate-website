"use client";

import { useState } from "react";
import styles from "./AdminPosts.module.css";
import { PROPERTIES_DATA } from "@/data/properties";

export default function AdminPosts() {
  const [filter, setFilter] = useState("all");

  // 🔥 FILTER LOGIC
  const filteredPosts = PROPERTIES_DATA.filter((p) => {
    if (filter === "approved") return p.is_approved;
    if (filter === "pending") return !p.is_approved;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Quản lý bài đăng</h1>

      {/* FILTER */}
      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={filter === "approved" ? styles.active : ""}
          onClick={() => setFilter("approved")}
        >
          Đã duyệt
        </button>
        <button
          className={filter === "pending" ? styles.active : ""}
          onClick={() => setFilter("pending")}
        >
          Chờ duyệt
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>

                <td className={styles.titleCol}>
                  {post.title}
                </td>

                <td>{post.price} tỷ</td>

                <td>
                  <span
                    className={`${styles.badge} ${
                      post.is_approved
                        ? styles.approved
                        : styles.pending
                    }`}
                  >
                    {post.is_approved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                </td>

                <td className={styles.actions}>
                  {!post.is_approved && (
                    <button className={styles.approve}>
                      ✔ Duyệt
                    </button>
                  )}

                  <button className={styles.edit}>
                    ✏ Sửa
                  </button>

                  <button className={styles.delete}>
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}