"use client";
import styles from "./styles/HomeSearch.module.css";

export default function HomeSearch() {
  return (
    <div className={styles.searchBox}>
      <div className={styles.tabs}>
        <button className={styles.active}>Mua bán</button>
        <button>Dự án</button>
      </div>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nhập khu vực, dự án, từ khóa..."
        />
        <button>Tìm kiếm</button>
      </div>
    </div>
  );
}
