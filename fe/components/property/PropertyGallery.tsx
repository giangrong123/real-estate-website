"use client";

import { useState } from "react";
import styles from "./PropertyGallery.module.css";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <img
        src={images[active]}
        alt={title}
        className={styles.main}
      />

      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === active ? styles.active : ""}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}