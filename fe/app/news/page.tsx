"use client";

import Link from "next/link";
import { useSelector } from "react-redux"; // Thêm hook để kết nối kho
import { RootState } from "@/stores/store"; // Import kiểu dữ liệu kho tổng
import styles from "./news.module.css";

export default function NewsPage() {
  // ❤️ Lấy danh sách tin tức từ Store thay vì dùng file cứng
  // filteredNews này sẽ tự động thay đổi nếu bạn làm thêm ô Search tin tức
  const newsList = useSelector((state: RootState) => state.news.filteredNews);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Tin tức & Phân tích ({newsList.length})</h1>

      <div className={styles.grid}>
        {newsList.length > 0 ? (
          newsList.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className={styles.content}>
                <span className={styles.date}>
                   {/* Bạn có thể viết thêm hàm format ngày tháng tại đây */}
                   {item.createdAt}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className={styles.readmore}>Đọc tiếp →</span>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noData}>Hiện tại chưa có bài viết nào.</p>
        )}
      </div>
    </section>
  );
}