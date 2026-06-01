"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/stores/store";
import { fetchProjectById } from "@/stores/slices/projectSlice";

import styles from "./detail.module.css";

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("vi-VN") : "—";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProject, loading, error } = useSelector(
    (state: RootState) => state.projects
  );

  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (id) dispatch(fetchProjectById(String(id)));
  }, [id, dispatch]);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!selectedProject) return <div>Không có dữ liệu</div>;

  const project = selectedProject;

  // ===== FIX FIELD FROM BACKEND =====
  const phone = project.contactPhone;
  const createdAt = project.createdAt;
  const updatedAt = project.updatedAt;

  const images =
    project.projectImages && project.projectImages.length > 0
      ? project.projectImages
      : [project.thumbnail || "/placeholder.jpg"];

  return (
    <section className={styles.wrapper}>
      <div className={styles.layout}>
        {/* ================= LEFT ================= */}
        <div className={styles.left}>
          {/* GALLERY */}
          <div className={styles.gallery}>
            <div className={styles.mainWrapper}>
              <img
                src={images[activeImg]}
                className={styles.mainImage}
                alt={project.name}
              />
            </div>

            <div className={styles.thumbList}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImg(i)}
                  className={
                    i === activeImg
                      ? styles.thumbActive
                      : styles.thumb
                  }
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* TITLE */}
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.address}>{project.address}</p>

          {/* STATS */}
          <div className={styles.stats}>
            <div>
              <span>Chủ đầu tư</span>
              <b>{project.investor || "Đang cập nhật"}</b>
            </div>

            <div>
              <span>Trạng thái</span>
              <b>{project.status}</b>
            </div>

            <div>
              <span>Ngày tạo</span>
              <b>{formatDate(createdAt)}</b>
            </div>

            <div>
              <span>Cập nhật</span>
              <b>{formatDate(updatedAt)}</b>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.section}>
            <h2>Giới thiệu dự án</h2>
            <p>{project.description || "Chưa có mô tả"}</p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <aside className={styles.right}>
          <div className={styles.contactBox}>
            <div className={styles.user}>
              <img
                src="/avatar-default.png"
                className={styles.avatar}
                alt="admin"
              />

              <div>
                <p className={styles.userName}>
                  Ban quản lý dự án
                </p>
                <span className={styles.userRole}>
                  {project.investor}
                </span>
              </div>
            </div>

            {/* PHONE CALL */}
            <a
              href={phone ? `tel:${phone}` : "#"}
              className={styles.callBtn}
            >
              📞 Gọi ngay: {phone || "Liên hệ"}
            </a>

            <p className={styles.note}>
              Liên hệ trực tiếp để được tư vấn chi tiết về dự án
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}