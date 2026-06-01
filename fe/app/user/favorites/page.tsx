"use client";

import Link from "next/link";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  toggleFavoriteAPI,
  fetchFavorites,
} from "@/stores/slices/favoriteSlice";

import styles from "./favorites.module.css";

export default function Favorites() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== USER =====
  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );

  // ===== FAVORITES =====
  const {
    favorites,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.favorites
  );

  // ===== FETCH DATA =====
  useEffect(() => {
    if (!user) return;

    dispatch(
      fetchFavorites(
        String(user.id)
      )
    );
  }, [
    dispatch,
    user,
  ]);

  // ===== NOT LOGIN =====
  if (!user) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>
          Vui lòng đăng nhập
        </p>

        <Link
          href="/auth/login"
          className={styles.emptyLink}
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  // ===== LOADING =====
  if (loading) {
    return (
      <div className={styles.loading}>
        Đang tải...
      </div>
    );
  }

  // ===== EMPTY =====
  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>
          Bạn chưa lưu tin nào ❤️
        </p>

        <Link
          href="/properties"
          className={styles.emptyLink}
        >
          Khám phá nhà đất ngay
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* TITLE */}
      <h1 className={styles.title}>
        Tin đã lưu

        <span className={styles.count}>
          {" "}
          ({favorites.length})
        </span>
      </h1>

      {/* LIST */}
      <div className={styles.grid}>
        {favorites.map(
          (item) => {
            const itemId =
              String(item.id);

            return (
              <div
                key={itemId}
                className={styles.card}
              >
                {/* IMAGE */}
                <img
                  src={
                    item.thumbnail
                  }
                  alt={
                    item.title
                  }
                  className={
                    styles.image
                  }
                />

                {/* CONTENT */}
                <div
                  className={
                    styles.content
                  }
                >
                  {/* INFO */}
                  <div
                    className={
                      styles.info
                    }
                  >
                    <h3
                      className={
                        styles.propertyTitle
                      }
                    >
                      {item.title}
                    </h3>

                    <p
                      className={
                        styles.price
                      }
                    >
                      💰{" "}
                      {item.price} tỷ
                    </p>

                    <p
                      className={
                        styles.address
                      }
                    >
                      📍{" "}
                      {
                        item.address
                      }
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div
                    className={
                      styles.actions
                    }
                  >
                    <Link
                      href={`/properties/${itemId}`}
                    >
                      <button
                        className={
                          styles.viewBtn
                        }
                      >
                        👁️ Xem chi tiết
                      </button>
                    </Link>

                    <button
                      className={
                        styles.removeBtn
                      }
                      // onClick={() =>
                      //   dispatch(
                      //     toggleFavoriteAPI(
                      //       itemId
                      //     )
                      //   )
                      onClick={() => {
  dispatch(toggleFavoriteAPI(itemId, String(user.id)));

  // 🔥 OPTIMISTIC UI: remove ngay lập tức
  dispatch({
    type: "SET_FAVORITES",
    payload: favorites.filter(
      (p) => String(p.id) !== itemId
    ),
  });
}}
                    >
                      ❌ Bỏ lưu
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}