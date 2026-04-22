"use client";

import { useSelector } from "react-redux"; // Dùng để lấy data từ kho
import { RootState } from "@/stores/store"; // Import kiểu dữ liệu của kho tổng
import ProjectCard from "@/components/project/ProjectCard";
import styles from "./project.module.css";

export default function ProjectPage() {
  // ❤️ Lấy danh sách dự án từ filteredProjects trong Store
  // Danh sách này sẽ tự động cập nhật nếu bạn thực hiện lọc ở các component khác
  const projects = useSelector(
    (state: RootState) => state.projects.filteredProjects
  );

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        Danh sách dự án ({projects.length})
      </h1>

      <div className={styles.grid}>
        {/* Kiểm tra nếu danh sách trống (ví dụ khi lọc không ra kết quả) */}
        {projects.length > 0 ? (
          projects.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))
        ) : (
          <div className={styles.noResult}>
            <p>Hiện tại không có dự án nào phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </section>
  );
}