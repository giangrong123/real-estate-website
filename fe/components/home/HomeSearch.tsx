"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { fetchPropertiesBySearch } from "@/stores/slices/propertySlice";
import { fetchProjectsBySearch } from "@/stores/slices/projectSlice";
import { Property } from "@/types/property";
import { Project } from "@/types/project";
import styles from "./styles/HomeSearch.module.css";

export default function HomeSearch() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<"buy" | "project">("buy");

  const { properties } = useSelector(
    (state: RootState) => state.properties
  );

  const { projects } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    if (!keyword.trim()) return;

    if (tab === "buy") {
      dispatch(fetchPropertiesBySearch(keyword));
    } else {
      dispatch(fetchProjectsBySearch(keyword));
    }
  }, [keyword, tab, dispatch]);

  const handleSearch = () => {
    if (!keyword.trim()) return;

    router.push(
      tab === "buy"
        ? `/properties?search=${encodeURIComponent(keyword)}`
        : `/projects?search=${encodeURIComponent(keyword)}`
    );
  };

  return (
    <div className={styles.searchBox}>
      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={tab === "buy" ? styles.active : ""}
          onClick={() => setTab("buy")}
        >
          Nhà đất bán
        </button>

        <button
          className={tab === "project" ? styles.active : ""}
          onClick={() => setTab("project")}
        >
          Dự án
        </button>
      </div>

      {/* FORM */}
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <span className={styles.icon}>🔍</span>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={
              tab === "buy"
                ? "Tìm nhà, chung cư..."
                : "Tìm tên dự án, chủ đầu tư..."
            }
          />

          {/* PROPERTY DROPDOWN */}
          {tab === "buy" &&
            keyword.trim() &&
            properties.length > 0 && (
              <div className={styles.suggestionBox}>
                {properties.slice(0, 5).map((item: Property) => (
                  <div
                    key={item.id}
                    className={styles.suggestionItem}
                    onClick={() =>
                      router.push(`/properties/${item.id}`)
                    }
                  >
                    <strong>{item.title}</strong>
                    <p>{item.address}</p>
                  </div>
                ))}
              </div>
            )}

          {/* PROJECT DROPDOWN */}
          {tab === "project" &&
            keyword.trim() &&
            projects.length > 0 && (
              <div className={styles.suggestionBox}>
                {projects.slice(0, 5).map((item: Project) => (
                  <div
                    key={item.id}
                    className={styles.suggestionItem}
                    onClick={() =>
                      router.push(`/projects/${item.id}`)
                    }
                  >
                    <strong>{item.name}</strong>
                    <p>{item.address}</p>
                  </div>
                ))}
              </div>
            )}
        </div>

        <button
          onClick={handleSearch}
          className={styles.btnSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}