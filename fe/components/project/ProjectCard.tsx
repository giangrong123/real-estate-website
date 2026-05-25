"use client";

import Link from "next/link";
import { useState } from "react";
import { Project } from "@/types/project";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const [liked, setLiked] = useState(false);

  function handleLike(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  }

  return (
    <Link href={`/projects/${project.id}`} className={styles.card}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={project.thumbnail || "/placeholder.jpg"}
          alt={project.name}
          className={styles.thumbnail}
        />

        <span className={styles.status}>{project.status}</span>

        {project.is_approved && (
          <span className={styles.approved}>Đã duyệt</span>
        )}
      </div>

      {/* INFO */}
      <div className={styles.info}>
        <h3 className={styles.title}>{project.name}</h3>
        <p className={styles.address}>{project.address}</p>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.meta}>
          <span>Chủ đầu tư: {project.investor}</span>

          {/* <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            {liked ? "❤️" : "🤍"}
          </button> */}
        </div>

        <div className={styles.footer}>
          <span className={styles.viewMore}>Xem chi tiết →</span>
        </div>
      </div>
    </Link>
  );
}