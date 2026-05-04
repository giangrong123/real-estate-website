// ProjectPage.tsx

"use client";

import { useEffect } from "react";

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
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const { projects, loading, error } =
    useSelector(
      (state: RootState) => state.projects
    );

  useEffect(() => {
    if (search) {
      dispatch(
        fetchProjectsBySearch(search)
      );
    } else {
      dispatch(fetchProjects());
    }
  }, [dispatch, search]);

  if (loading) {
    return (
      <div className={styles.loading}>
        Đang tải danh sách dự án...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Lỗi: {error}
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        {search
          ? `Kết quả cho "${search}" (${projects.length})`
          : `Danh sách dự án (${projects.length})`}
      </h1>

      <div className={styles.grid}>
        {projects.length > 0 ? (
          projects.map((item) => (
            <ProjectCard
              key={item.id}
              project={item}
            />
          ))
        ) : (
          <div className={styles.noResult}>
            <p>
              Không tìm thấy dự án phù hợp.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}