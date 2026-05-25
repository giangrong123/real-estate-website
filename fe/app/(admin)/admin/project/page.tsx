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
  fetchProjects,
  deleteProject,
} from "@/stores/slices/projectSlice";

import {
  AppDispatch,
  RootState,
} from "@/stores/store";

import styles from "./ProjectPage.module.css";

export default function ProjectPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== PAGE =====
  const [page, setPage] =
    useState(1);

  // ===== REDUX =====
  const {
    projects,
    loading,
    totalPages,
  } = useSelector(
    (state: RootState) =>
      state.projects
  );

  // ===== FETCH =====
  useEffect(() => {
    dispatch(fetchProjects(page));
  }, [dispatch, page]);

  // ===== DELETE =====
  const handleDelete = (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        "Bạn có chắc muốn xoá?"
      );

    if (!confirmDelete) return;

    dispatch(deleteProject(id));
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
        <h1 className={styles.title}>
          Quản lý dự án
        </h1>

        <Link href="/admin/project/create">
          <button
            className={styles.addBtn}
          >
            + Tạo dự án
          </button>
        </Link>
      </div>

      {/* EMPTY */}
      {projects.length === 0 ? (
        <div className={styles.emptyBox}>
          <h2>
            Chưa có dự án nào
          </h2>

          <p>
            Hãy tạo dự án đầu tiên
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
                  <th>Ảnh</th>
                  <th>Tên dự án</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {projects.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >
                      {/* ID */}
                      <td>
                        {item.id}
                      </td>

                      {/* IMAGE */}
                      <td>
                        <img
                          src={
                            item.thumbnail
                          }
                          alt={
                            item.name
                          }
                          className={
                            styles.thumbnail
                          }
                        />
                      </td>

                      {/* NAME */}
                      <td
                        className={
                          styles.titleCol
                        }
                      >
                        {item.name}
                      </td>

                      {/* DESC */}
                      <td
                        className={
                          styles.desc
                        }
                      >
                        {item.description?.slice(
                          0,
                          100
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
                          href={`/admin/project/edit/${item.id}`}
                        >
                          <button
                            className={
                              styles.edit
                            }
                          >
                            ✏ Sửa
                          </button>
                        </Link>

                        <button
                          className={
                            styles.delete
                          }
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                        >
                          🗑 Xoá
                        </button>
                      </td>
                    </tr>
                  )
                )}
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