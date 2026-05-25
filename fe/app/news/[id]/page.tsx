"use client";

import {
  useEffect,
} from "react";

import {
  useParams,
  notFound,
} from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  fetchNewsById,
} from "@/stores/slices/newsSlice";

import styles from "./detail.module.css";

export default function DetailPage() {
  const { id } =
    useParams();

  const dispatch =
    useDispatch<AppDispatch>();

  const {
    selectedNews,
    loading,
    error,
  } = useSelector(
    (state: RootState) =>
      state.news
  );

  useEffect(() => {
    if (id) {
      dispatch(
        fetchNewsById(
          String(id)
        )
      );
    }
  }, [
    id,
    dispatch,
  ]);

  // loading
  if (
    loading ||
    !selectedNews
  ) {
    return (
      <div
        className={
          styles.wrapper
        }
      >
        Đang tải bài viết...
      </div>
    );
  }

  // error
  if (error) {
    return (
      <div
        className={
          styles.wrapper
        }
      >
        {error}
      </div>
    );
  }

  // not found
  if (
    !loading &&
    !selectedNews
  ) {
    return notFound();
  }

  return (
    <article
      className={
        styles.wrapper
      }
    >
      <h1
        className={
          styles.title
        }
      >
        {
          selectedNews.title
        }
      </h1>

      <p
        className={
          styles.date
        }
      >
        {selectedNews.createdAt
          ? new Date(
              selectedNews.createdAt
            ).toLocaleDateString(
              "vi-VN"
            )
          : "Không rõ ngày"}
      </p>

      <img
        src={
          selectedNews.thumbnail
        }
        alt={
          selectedNews.title
        }
        className={
          styles.thumbnail
        }
      />

      <div
        className={
          styles.content
        }
      >
        {selectedNews.content ? (
          selectedNews.content
            .split("\n")
            .map(
              (
                paragraph,
                index
              ) =>
                paragraph.trim() ? (
                  <p
                    key={index}
                    style={{
                      marginBottom:
                        "1rem",
                    }}
                  >
                    {
                      paragraph
                    }
                  </p>
                ) : null
            )
        ) : (
          <p>
            Nội dung đang được
            cập nhật...
          </p>
        )}
      </div>
    </article>
  );
}