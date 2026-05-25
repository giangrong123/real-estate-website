"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  fetchNews,
} from "@/stores/slices/newsSlice";

import styles from "./news.module.css";

export default function NewsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const [page, setPage] =
    useState(1);

  const {
    news,
    loading,
    error,
    totalPages,
  } = useSelector(
    (state: RootState) =>
      state.news
  );

  useEffect(() => {
    dispatch(
      fetchNews(page)
    );
  }, [
    dispatch,
    page,
  ]);

  if (loading) {
    return (
      <div
        className={
          styles.loading
        }
      >
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={
          styles.error
        }
      >
        {error}
      </div>
    );
  }

  return (
    <section
      className={
        styles.wrapper
      }
    >
      <h1
        className={
          styles.title
        }
      >
        Tin tức & Phân tích (
        {news.length})
      </h1>

      <div
        className={
          styles.grid
        }
      >
        {news.length >
          0 ? (
          news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className={
                styles.card
              }
            >
              <div
                className={
                  styles.imageWrapper
                }
              >
                <img
                  src={
                    item.thumbnail
                  }
                  alt={
                    item.title
                  }
                />
              </div>

              <div
                className={
                  styles.content
                }
              >
                <span
                  className={
                    styles.date
                  }
                >
                  {item.createdAt
                    ? new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "vi-VN"
                    )
                    : "Không rõ ngày"}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {
                    item.excerpt
                  }
                </p>

                <span
                  className={
                    styles.readmore
                  }
                >
                  Đọc tiếp →
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p
            className={
              styles.noData
            }
          >
            Hiện tại chưa có bài
            viết nào.
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "center",

          gap: "10px",

          marginTop:
            "30px",

          alignItems:
            "center",
        }}
      >
        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setPage(index + 1)
              }
              style={{
                padding:
                  "6px 12px",

                border:
                  "1px solid #ccc",

                background:
                  page ===
                    index + 1
                    ? "black"
                    : "white",

                color:
                  page ===
                    index + 1
                    ? "white"
                    : "black",

                cursor:
                  "pointer",

                fontWeight:
                  page ===
                    index + 1
                    ? "bold"
                    : "normal",
              }}
            >
              {index + 1}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>
      </div>
    </section>
  );
}