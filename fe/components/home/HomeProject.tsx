"use client";

import Link from "next/link";

import styles from "./styles/HomeProjects.module.css";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  AppDispatch,
  RootState,
} from "@/stores/store";

import {
  fetchProjects,
} from "@/stores/slices/projectSlice";

export default function HomeProject() {
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    projects,
    loading,
  } = useSelector(
    (
      state: RootState
    ) => state.projects
  );

  // CALL API
  useEffect(() => {
    dispatch(fetchProjects(1));
  }, [dispatch]);

  if (loading) {
    return (
      <section
        className={
          styles.projects
        }
      >
        <h2>
          Đang tải dự án...
        </h2>
      </section>
    );
  }

  return (
    <section
      className={
        styles.projects
      }
    >
      <div
        className={
          styles.header
        }
      >
        <h2
          className={
            styles.title
          }
        >
          Dự án bất động sản
          nổi bật
        </h2>

        <Link
          href="/projects"
          className={
            styles.viewMore
          }
        >
          Xem thêm →
        </Link>
      </div>

      <div
        className={
          styles.list
        }
      >
        {projects
          .slice(0, 4)
          .map((item) => (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className={
                styles.item
              }
            >
              <img
                src={
                  item.thumbnail
                }
                alt={
                  item.name
                }
              />

              <div
                className={
                  styles.content
                }
              >
                <span>
                  {
                    item.status
                  }
                </span>

                <h3>
                  {item.name}
                </h3>

                <p>
                  {
                    item.description
                  }
                </p>

                <p>
                  {item.address}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}