"use client"

import Link from "next/link";
import { useState } from "react";
import { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  const [liked, setLiked] = useState(false);

  function handleLike(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  }

  return (
    <Link href={`/properties/${property.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={property.thumbnail}
          alt={property.title}
          className={styles.thumbnail}
        />

        <span className={styles.price}>{property.price} tỷ</span>

        {property.is_featured && (
          <span className={styles.featured}>Nổi bật</span>
        )}

      </div>

      <div className={styles.info}>
        
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.address}>{property.address}</p>
        

        <div className={styles.meta}>
          <span>{property.area} m²</span>
          <span>{property.bedrooms} PN</span>
          <span>{property.bathrooms} WC</span>
          <span>{property.direction}</span>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
            aria-label="Lưu tin yêu thích"
          >
            ♥
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles.viewMore}>Xem chi tiết →</span>
        </div>
      </div>
    </Link>
  );
}