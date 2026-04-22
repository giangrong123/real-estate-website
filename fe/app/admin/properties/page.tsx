"use client";

import { useState } from "react";
import styles from "./AdminProperties.module.css";
import { PROPERTIES_DATA } from "@/data/properties";

export default function AdminProperties() {
  const [filter, setFilter] = useState("all");

  // 🔥 FILTER LOGIC
  const filtered = PROPERTIES_DATA.filter((p) => {
    if (filter === "active") return p.status === "available";
    if (filter === "sold") return p.status === "sold";
    if (filter === "pending") return !p.is_approved;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Quản lý bất động sản</h1>

      {/* FILTER */}
      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>

        <button
          className={filter === "active" ? styles.active : ""}
          onClick={() => setFilter("active")}
        >
          Đang bán
        </button>

        <button
          className={filter === "sold" ? styles.active : ""}
          onClick={() => setFilter("sold")}
        >
          Đã bán
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
              <th>Diện tích</th>
              <th>Trạng thái</th>
              <th>Duyệt</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td className={styles.titleCol}>
                  {item.title}
                </td>

                <td>{item.price} tỷ</td>

                <td>{item.area} m²</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`${styles.badge} ${
                      item.status === "available"
                        ? styles.activeStatus
                        : styles.soldStatus
                    }`}
                  >
                    {item.status === "available"
                      ? "Đang bán"
                      : "Đã bán"}
                  </span>
                </td>

                {/* APPROVAL */}
                <td>
                  <span
                    className={`${styles.badge} ${
                      item.is_approved
                        ? styles.approved
                        : styles.pending
                    }`}
                  >
                    {item.is_approved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                </td>

                {/* ACTION */}
                <td className={styles.actions}>
                  {!item.is_approved && (
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