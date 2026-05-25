"use client";

import { useEffect, useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { useSearchParams } from "next/navigation";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  fetchProjects,
  fetchProjectsBySearch,
} from "@/stores/slices/projectSlice";

import ProjectCard from "@/components/project/ProjectCard";

import styles from "./project.module.css";

export default function ProjectPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const searchParams =
    useSearchParams();

  const search =
    searchParams.get("search");

  // ===== PAGE =====
  const [page, setPage] =
    useState(1);

  const {
    projects,
    loading,
    error,
    totalPages,
  } = useSelector(
    (state: RootState) =>
      state.projects
  );

  useEffect(() => {
    if (search) {
      dispatch(
        fetchProjectsBySearch(
          search
        )
      );
    } else {
      dispatch(
        fetchProjects(page)
      );
    }
  }, [
    dispatch,
    search,
    page,
  ]);

  if (loading) {
    return (
      <div
        className={
          styles.loading
        }
      >
        Đang tải danh sách
        dự án...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.error}
      >
        Lỗi: {error}
      </div>
    );
  }

  return (
    <section
      className={styles.wrapper}
    >
      <h1
        className={styles.title}
      >
        {search
          ? `Kết quả cho "${search}" (${projects.length})`
          : `Danh sách dự án`}
      </h1>

      <div
        className={styles.grid}
      >
        {projects.length > 0 ? (
          projects.map((item) => (
            <ProjectCard
              key={item.id}
              project={item}
            />
          ))
        ) : (
          <div
            className={
              styles.noResult
            }
          >
            <p>
              Không tìm thấy dự
              án phù hợp.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {!search && (
        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            gap: "10px",
            marginTop: "30px",
            alignItems: "center",
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
                  fontWeight:
                    page ===
                      index + 1
                      ? "bold"
                      : "normal",

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

                  padding:
                    "6px 12px",

                  border:
                    "1px solid #ccc",

                  cursor:
                    "pointer",
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
      )}
    </section>
  );
}