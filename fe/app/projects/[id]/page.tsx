"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/stores/store";
import { fetchProjectById } from "@/stores/slices/projectSlice";

import styles from "./detail.module.css";
import HomeProject from "@/components/home/HomeProject";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN");

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

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.thumbnail || "/placeholder.jpg"];

  return (
    <section className={styles.wrapper}>

      <div className={styles.layout}>

        {/* ================= LEFT ================= */}
        <div className={styles.left + " " + styles.fadeIn}>

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
              <span>Phê duyệt</span>
              <b>{project.is_approved ? "Đã duyệt" : "Chưa duyệt"}</b>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.section}>
            <h2>Giới thiệu dự án</h2>
            <p>{project.description || "Chưa có mô tả"}</p>
          </div>

          <div className={styles.section}>
            <h2>Thông tin</h2>
            <ul>
              <li>
                <b>Ngày tạo:</b>{" "}
                {project.created_at ? formatDate(project.created_at) : "—"}
              </li>
              <li>
                <b>Cập nhật:</b>{" "}
                {project.updated_at ? formatDate(project.updated_at) : "—"}
              </li>
            </ul>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <aside className={styles.right + " " + styles.fadeIn}>

          <div className={styles.contactBox}>

            <div className={styles.user}>
              <img src="/avatar-default.png" className={styles.avatar} />
              <div>
                <p className={styles.userName}>Ban quản lý dự án</p>
                <span className={styles.userRole}>
                  {project.investor || "Chủ đầu tư"}
                </span>
              </div>
            </div>

            <button className={styles.callBtn}>
              📞 Gọi ngay: {project.contact_phone || "Liên hệ"}
            </button>

            <button className={styles.zaloBtn}>
              💬 Nhận tư vấn Zalo
            </button>

          </div>

        </aside>

      </div>

      {/* <HomeProject /> */}

    </section>
  );
}