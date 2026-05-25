"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchNews,
  deleteNews,
} from "@/stores/slices/newsSlice";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import styles from "./admin-news.module.css";

export default function AdminNewsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== PAGE =====
  const [page, setPage] =
    useState(1);

  // ===== REDUX =====
  const {
    news,
    loading,
    totalPages,
  } = useSelector(
    (state: RootState) => state.news
  );

  // ===== FETCH =====
  useEffect(() => {
    dispatch(fetchNews(page));
  }, [dispatch, page]);

  // ===== DELETE =====
  const handleDelete = (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        "Bạn có chắc muốn xoá news này?"
      );

    if (!confirmDelete) return;

    dispatch(deleteNews(id));
  };

  // ===== LOADING =====
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.loading}>
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Quản lý bài viết
          </h1>

          <p className={styles.subtitle}>
            News Management Dashboard
          </p>
        </div>

        <Link href="/admin/news/create">
          <button
            className={styles.addBtn}
          >
            + Tạo bài viết
          </button>
        </Link>
      </div>

      {/* EMPTY */}
      {news.length === 0 ? (
        <div className={styles.emptyBox}>
          <h2>
            Chưa có bài viết nào
          </h2>

          <p>
            Hãy tạo bài viết đầu tiên
          </p>
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div
            className={
              styles.tableWrapper
            }
          >
            <table
              className={
                styles.table
              }
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Thumbnail</th>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {news.map((item) => (
                  <tr key={item.id}>
                    {/* ID */}
                    <td>{item.id}</td>

                    {/* IMAGE */}
                    <td>
                      <img
                        src={
                          item.thumbnail ||
                          "/no-image.png"
                        }
                        alt={
                          item.title
                        }
                        className={
                          styles.thumbnail
                        }
                      />
                    </td>

                    {/* TITLE */}
                    <td
                      className={
                        styles.titleCol
                      }
                    >
                      {item.title}
                    </td>

                    {/* EXCERPT */}
                    <td
                      className={
                        styles.excerpt
                      }
                    >
                      {item.excerpt?.slice(
                        0,
                        120
                      )}
                      ...
                    </td>

                    {/* ACTION */}
                    <td
                      className={
                        styles.actions
                      }
                    >
                      <Link
                        href={`/admin/news/edit/${item.id}`}
                      >
                        <button
                          className={
                            styles.edit
                          }
                        >
                          ✏ Edit
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className={
                          styles.delete
                        }
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
            >
              ← Prev
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={
                    page === index + 1
                      ? styles.active
                      : ""
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}