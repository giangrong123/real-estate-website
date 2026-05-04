"use client";

import Link from "next/link";
import { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store"; 
import { toggleFavoriteAPI } from "@/stores/slices/favoriteSlice"; // 🔥 đổi ở đây

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const propertyId = String(property.id);

  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds || []
  );

  const liked = favoriteIds.includes(propertyId);

  function handleLike(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleFavoriteAPI("1", propertyId)); // 🔥 CALL API
  }

  if (!property) return null;

  return (
    <Link 
      href={`/properties/${propertyId}`} 
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img
          src={property.thumbnail || "/placeholder-home.jpg"}
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

          <button
            type="button"
            className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
            onClick={handleLike}
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </Link>
  );
}