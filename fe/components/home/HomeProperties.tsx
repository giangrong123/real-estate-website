"use client";

import Link from "next/link";
import styles from "./styles/HomeProperties.module.css";
import { useState } from "react";
import { PROPERTIES_DATA } from "@/data/properties";

export default function HomeProperties() {
  const [limit, setLimit] = useState(8);
  const [click, setClick] = useState(false);

  // lưu danh sách id đã like
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  function handleClick() {
    setLimit((prev) => prev + 8);
    setClick(true);
  }

  function toggleLike(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) {
    e.preventDefault();   // chặn Link
    e.stopPropagation(); // chặn bubbling

    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function getDaysAgo(createdAt: string | number | Date) {
    const now = new Date().getTime();
    const createdTime = new Date(createdAt).getTime();
    const diffTime = now - createdTime;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className={styles.bgc}>
      <section className={styles.news}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bất động sản dành cho bạn</h2>
        </div>

        <div className={styles.list}>
          {PROPERTIES_DATA.slice(0, limit).map((item) => {
            const liked = likedIds.has(item.id);

            return (
              <Link
                href={`/properties/${item.id}`}
                key={item.id}
                className={styles.link}
              >
                <article className={styles.item}>
                  <img src={item.thumbnail} alt={item.title} />

                  <div className={styles.content}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.address}</p>
                    <span>{item.price} tỷ</span>
                    <span> · </span>
                    <span>{item.area} m2</span>
                  </div>

                  <div className={styles.content2}>
                    <span>
                      Đăng {getDaysAgo(item.created_at)} ngày trước
                    </span>

                    {/* LIKE BUTTON */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, item.id)}
                      className={`${styles.likeBtn} ${
                        liked ? styles.liked : ""
                      }`}
                    >
                      ♥
                    </button>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className={styles.footer}>
          {click ? (
            <Link href="/properties" className={styles.btn}>
              Xem tiếp
            </Link>
          ) : (
            <button className={styles.btn} onClick={handleClick}>
              Xem thêm
            </button>
          )}
        </div>
      </section>
    </div>
  );
}