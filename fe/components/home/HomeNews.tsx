"use client";

import Link from "next/link";
import styles from "./styles/HomeNews.module.css";

import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  AppDispatch,
  RootState,
} from "@/stores/store";

import { fetchNews } from "@/stores/slices/newsSlice";

export default function HomeNews() {
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    news,
    loading,
  } = useSelector(
    (
      state: RootState
    ) => state.news
  );

  // ACTIVE ID
  const [activeId, setActiveId] =
    useState<number | null>(null);

  // ACTIVE NEWS
  const activeNews =
    news.find(
      (item) =>
        item.id === activeId
    ) || news[0];

  // CALL API
  useEffect(() => {
    dispatch(fetchNews(1));
  }, [dispatch]);

  if (loading) {
    return (
      <section className={styles.news}>
        <h2>
          Đang tải tin tức...
        </h2>
      </section>
    );
  }

  return (
    <section className={styles.news}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Tin bất động sản nổi bật
        </h2>

        <Link
          href="/news"
          className={
            styles.viewMore
          }
        >
          Xem thêm →
        </Link>
      </div>

      <div className={styles.layout}>
        {/* FEATURED */}
        <article
          className={
            styles.featured
          }
        >
          {activeNews ? (
            <Link
              href={`/news/${activeNews.id}`}
            >
              <img
                src={
                  activeNews.thumbnail
                }
                alt={
                  activeNews.title
                }
              />

              <div
                className={
                  styles.featuredContent
                }
              >
                <h3>
                  {
                    activeNews.title
                  }
                </h3>
              </div>
            </Link>
          ) : (
            <p>
              Chưa có tin nổi bật
            </p>
          )}
        </article>

        {/* LIST */}
        <div className={styles.list}>
          {news.map((item) => {
            const isActive =
              activeNews?.id ===
              item.id;

            return (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className={`${
                  styles.item
                } ${
                  isActive
                    ? styles.active
                    : ""
                }`}
                onMouseEnter={() =>
                  setActiveId(
                    item.id
                  )
                }
              >
                <h4>
                  {item.title}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}