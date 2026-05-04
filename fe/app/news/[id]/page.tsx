"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/stores/store";
import { fetchNews } from "@/stores/slices/newsSlice";

import styles from "./detail.module.css";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { allNews, loading } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (allNews.length === 0) {
      dispatch(fetchNews());
    }
  }, [allNews.length, dispatch]);

  // 🔥 fix lỗi load trước data
  if (loading || allNews.length === 0) {
    return (
      <div className={styles.wrapper}>
        Đang tải bài viết...
      </div>
    );
  }

  const news = allNews.find(
    (n) => String(n.id) === String(id)
  );

  if (!news) return notFound();

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.title}>{news.title}</h1>

      <p className={styles.date}>
        {news.created_at
          ? new Date(news.created_at).toLocaleDateString("vi-VN")
          : "Không rõ ngày"}
      </p>

      <img
        src={news.thumbnail}
        alt={news.title}
        className={styles.thumbnail}
      />

      <div className={styles.content}>
        {news.content ? (
          news.content.split("\n").map((paragraph, index) =>
            paragraph.trim() ? (
              <p key={index} style={{ marginBottom: "1rem" }}>
                {paragraph}
              </p>
            ) : null
          )
        ) : (
          <p>Nội dung đang được cập nhật...</p>
        )}
      </div>
    </article>
  );
}