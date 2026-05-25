"use client";

import { useEffect, useMemo } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "@/stores/store";

import { fetchProperties } from "@/stores/slices/propertySlice";

import styles from "./user.module.css";

export default function UserDashboard() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== USER =====
  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );

  // ===== PROPERTIES =====
  const properties = useSelector(
    (state: RootState) =>
      state.properties.properties
  );

  // ===== FAVORITES =====
  const favoriteIds = useSelector(
    (state: RootState) =>
      state.favorites.favoriteIds
  );

  // ===== FETCH DB =====
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // ===== MY POSTS =====
  const myPosts = useMemo(() => {
    if (!user) return [];

    return properties.filter(
      (item) =>
        item.userId === Number(user.id)
    );
  }, [properties, user]);

  // ===== STATS =====
  const totalPosts = myPosts.length;

  const totalFavorites =
    favoriteIds.length;

  // fake views
  const totalViews =
    myPosts.length * 25;

  return (
    <div className={styles.dashboard}>
      {/* HEADER */}
      <div
        className={
          styles.dashboardHeader
        }
      >
        <div>
          <h1
            className={
              styles.dashboardTitle
            }
          >
            Dashboard
          </h1>

          <p
            className={
              styles.dashboardSubtitle
            }
          >
            Xin chào, {user?.name}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div
        className={styles.statsGrid}
      >
        <Card
          title="Tin đã đăng"
          value={totalPosts}
        />

        <Card
          title="Tin đã lưu"
          value={totalFavorites}
        />

        <Card
          title="Lượt xem"
          value={totalViews}
        />
      </div>

      {/* MY POSTS */}
      {/* <div className={styles.posts}>
        <h2 className={styles.heading}>
          Tin của tôi
        </h2>

        {myPosts.length === 0 ? (
          <p
            className={
              styles.emptyText
            }
          >
            Bạn chưa có tin đăng nào
          </p>
        ) : (
          <div
            className={
              styles.postsGrid
            }
          >
            {myPosts.map((item) => (
              <div
                key={item.id}
                className={
                  styles.postCard
                }
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={
                    styles.thumbnail
                  }
                />

                <div
                  className={
                    styles.postContent
                  }
                >
                  <h3
                    className={
                      styles.postTitle
                    }
                  >
                    {item.title}
                  </h3>

                  <p
                    className={
                      styles.postPrice
                    }
                  >
                    {item.price} tỷ
                  </p>

                  <p
                    className={
                      styles.postAddress
                    }
                  >
                    {item.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}

// ===== CARD =====
function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className={styles.statsCard}
    >
      <p
        className={
          styles.statsTitle
        }
      >
        {title}
      </p>

      <h2
        className={
          styles.statsValue
        }
      >
        {value}
      </h2>
    </div>
  );
}