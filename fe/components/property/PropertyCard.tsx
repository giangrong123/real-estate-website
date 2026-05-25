"use client";

import Link from "next/link";
import { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  toggleFavoriteAPI,
} from "@/stores/slices/favoriteSlice";

type Props = {
  property: Property;
};

export default function PropertyCard({
  property,
}: Props) {
  const dispatch =
    useDispatch<AppDispatch>();

  const propertyId = String(
    property.id
  );

  // ===== AUTH =====
  const {
    isLoggedIn,
    user,
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  // ===== FAVORITES =====
  const favoriteIds =
    useSelector(
      (state: RootState) =>
        Array.isArray(
          state.favorites.favoriteIds
        )
          ? state.favorites
              .favoriteIds
          : []
    );

  const liked =
    favoriteIds.includes(
      propertyId
    );

  // ===== HANDLE LIKE =====
  function handleLike(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    // 🚨 NOT LOGIN
    if (
      !isLoggedIn ||
      !user?.id
    ) {
      alert(
        "Bạn cần đăng nhập để sử dụng tính năng yêu thích"
      );

      return;
    }

    // ✅ TOGGLE FAVORITE
    dispatch(
      toggleFavoriteAPI(
        propertyId
      )
    );
  }

  if (!property) return null;

  return (
    <Link
      href={`/properties/${propertyId}`}
      className={styles.card}
    >
      {/* IMAGE */}
      <div
        className={
          styles.imageWrapper
        }
      >
        <img
          src={
            property.thumbnail ||
            "/placeholder-home.jpg"
          }
          alt={property.title}
          className={
            styles.thumbnail
          }
        />

        {/* PRICE */}
        <span
          className={
            styles.price
          }
        >
          {property.price} tỷ
        </span>

        {/* FEATURED */}
        {property.is_featured && (
          <span
            className={
              styles.featured
            }
          >
            Nổi bật
          </span>
        )}
      </div>

      {/* INFO */}
      <div className={styles.info}>
        <h3
          className={
            styles.title
          }
        >
          {property.title}
        </h3>

        <p
          className={
            styles.address
          }
        >
          {property.address}
        </p>

        {/* META */}
        <div
          className={
            styles.meta
          }
        >
          <span>
            {property.area} m²
          </span>

          <span>
            {property.bedrooms} PN
          </span>

          <span>
            {property.bathrooms} WC
          </span>
        </div>

        {/* ACTIONS */}
        <div
          className={
            styles.actions
          }
        >
          <button
            type="button"
            className={`${
              styles.likeBtn
            } ${
              liked
                ? styles.liked
                : ""
            }`}
            onClick={
              handleLike
            }
          >
            {liked
              ? "❤️"
              : "🤍"}
          </button>
        </div>
      </div>
    </Link>
  );
}