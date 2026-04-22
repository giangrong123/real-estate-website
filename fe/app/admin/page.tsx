"use client";

import styles from "./dashboard.module.css";
import { PROPERTIES_DATA } from "@/data/properties";

export default function AdminDashboard() {
  const totalProperties = PROPERTIES_DATA.length;
  const approved = PROPERTIES_DATA.filter(p => p.is_approved).length;
  const pending = PROPERTIES_DATA.filter(p => !p.is_approved).length;

  const users = 120;
  const posts = totalProperties;

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.card}>
          <div className={styles.icon}>👤</div>
          <div>
            <h3>Người dùng</h3>
            <p>{users}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>🏠</div>
          <div>
            <h3>Bất động sản</h3>
            <p>{totalProperties}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>📝</div>
          <div>
            <h3>Bài đăng</h3>
            <p>{posts}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>✅</div>
          <div>
            <h3>Đã duyệt</h3>
            <p>{approved}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>⏳</div>
          <div>
            <h3>Chờ duyệt</h3>
            <p>{pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
}