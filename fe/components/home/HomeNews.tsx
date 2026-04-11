"use client";

import Link from "next/link";
import styles from "./styles/HomeNews.module.css";
import { NEWS_DATA } from "@/data/news";
import { useState } from "react";

export default function HomeNews() {
  const [activeNews, setActiveNews] = useState(NEWS_DATA[0]);

  return (
    <section className={styles.news}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tin bất động sản nổi bật</h2>
        <Link href="/news" className={styles.viewMore}>
          Xem thêm →
        </Link>
      </div>

      <div className={styles.layout}>
        {/* FEATURED */}
        <article className={styles.featured}>
          {activeNews ? (
            <Link href={`/news/${activeNews.slug}`}>
              <img
                src={activeNews.thumbnail}
                alt={activeNews.title}
              />
              <div className={styles.featuredContent}>
                <h3>{activeNews.title}</h3>
              </div>
            </Link>
          ) : (
            <p>Chưa có tin nổi bật</p>
          )}
        </article>

        {/* LIST */}
        <div className={styles.list}>
          {NEWS_DATA.map((item) => {
            const isActive = activeNews?.id === item.id;

            return (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                onMouseEnter={() => setActiveNews(item)}
              >
                <h4>{item.title}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}