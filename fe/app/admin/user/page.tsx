"use client";

import { useState } from "react";
import styles from "./AdminUsers.module.css";

const USERS = [
  {
    id: 1,
    name: "Hoàng Giang",
    email: "giang@example.com",
    role: "user",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    role: "user",
  },
];

export default function AdminUsers() {
  const [filter, setFilter] = useState("all");

  const filtered = USERS.filter((u) => {
    if (filter === "admin") return u.role === "admin";
    if (filter === "user") return u.role === "user";
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Quản lý người dùng</h1>

      {/* FILTER */}
      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>

        <button
          className={filter === "admin" ? styles.active : ""}
          onClick={() => setFilter("admin")}
        >
          Admin
        </button>

        <button
          className={filter === "user" ? styles.active : ""}
          onClick={() => setFilter("user")}
        >
          User
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                {/* ROLE BADGE */}
                <td>
                  <span
                    className={`${styles.badge} ${
                      user.role === "admin"
                        ? styles.admin
                        : styles.user
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>

                {/* ACTION */}
                <td className={styles.actions}>
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