"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/HomeSearch.module.css";
import { useDebounce } from "@/hooks/useDebounce";

// Import Action từ cả 2 slice
import { setProjectFilters } from "@/stores/slices/projectSlice";
import { RootState } from "@/stores/store";



export default function HomeSearch() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<"buy" | "project">("buy");

  // Lấy data từ cả 2 kho để làm gợi ý (Autocomplete)
  const allProperties = useSelector((state: RootState) => state.properties.allProperties);
  const allProjects = useSelector((state: RootState) => state.projects.allProjects);

  const debouncedKeyword = useDebounce(keyword, 400);

  // 🔥 AUTOCOMPLETE LOGIC: Tự động đổi nguồn dữ liệu theo Tab
  const suggestions = useMemo(() => {
    if (!debouncedKeyword) return [];

    const dataSource = tab === "buy" ? allProperties : allProjects;
    
    // Tìm theo tên/tiêu đề hoặc địa chỉ
    return dataSource.filter((item: any) => {
      const title = item.title || item.name; // Property dùng title, Project dùng name
      return (
        title.toLowerCase().includes(debouncedKeyword.toLowerCase()) ||
        item.address.toLowerCase().includes(debouncedKeyword.toLowerCase())
      );
    }).slice(0, 5);
  }, [debouncedKeyword, tab, allProperties, allProjects]);

  // 🔥 SEARCH LOGIC: Phân luồng theo Tab
  const handleSearch = () => {
    if (!keyword.trim()) return;

    if (tab === "buy") {
      // 1. Gửi vào kho Bất động sản
      dispatch(setPropertyFilter(keyword));
      // 2. Sang trang danh sách BĐS
      router.push(`/properties?keyword=${encodeURIComponent(keyword)}`);
    } else {
      // 1. Gửi vào kho Dự án (keyword được bọc trong object Partial)
      dispatch(setProjectFilters({ keyword }));
      // 2. Sang trang danh sách Dự án
      router.push(`/project?keyword=${encodeURIComponent(keyword)}`);
    }
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
            placeholder={tab === "buy" ? "Tìm nhà, chung cư..." : "Tìm tên dự án, chủ đầu tư..."}
          />

          {/* 🔥 AUTOCOMPLETE DROPDOWN */}
          {suggestions.length > 0 && (
            <div className={styles.suggestionBox}>
              {suggestions.map((item: any) => (
                <div
                  key={item.id}
                  className={styles.suggestionItem}
                  onClick={() => {
                    const path = tab === "buy" ? `/properties/${item.id}` : `/project/${item.id}`;
                    router.push(path);
                  }}
                >
                  <strong>{item.title || item.name}</strong>
                  <p>{item.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSearch} className={styles.btnSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}