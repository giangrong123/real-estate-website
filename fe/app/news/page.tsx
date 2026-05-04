"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"; 
import { RootState, AppDispatch } from "@/stores/store"; 
import { fetchNews } from "@/stores/slices/newsSlice"; 
import styles from "./news.module.css";

export default function NewsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { allNews, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        Tin tức & Phân tích ({allNews.length})
      </h1>

      <div className={styles.grid}>
        {allNews.length > 0 ? (
          allNews.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`} // ✅ FIX: dùng ID
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className={styles.content}>
                <span className={styles.date}>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("vi-VN")
                    : "Không rõ ngày"}
                </span>

                <h3>{item.title}</h3>

                <p>{item.excerpt}</p>

                <span className={styles.readmore}>
                  Đọc tiếp →
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noData}>
            Hiện tại chưa có bài viết nào.
          </p>
        )}
      </div>
    </section>
  );
}