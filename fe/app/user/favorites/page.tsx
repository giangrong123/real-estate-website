"use client";

import Link from "next/link";

import { useEffect, useMemo } from "react";

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

import { fetchProperties } from "@/stores/slices/propertySlice";

export default function Favorites() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== USER =====
  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );

  // ===== FAVORITES =====
  const { favoriteIds } =
    useSelector(
      (state: RootState) =>
        state.favorites
    );

  // ===== PROPERTIES =====
  const { properties, loading } =
    useSelector(
      (state: RootState) =>
        state.properties
    );

  // ===== FETCH DATA =====
  useEffect(() => {
    if (!user) return;

    // favorites
    dispatch(
      fetchFavorites(
        String(user.id)
      )
    );

    // properties
    if (properties.length === 0) {
      dispatch(fetchProperties());
    }
  }, [
    dispatch,
    user,
    properties.length,
  ]);

  // ===== FILTER FAVORITES =====
  const favoritePosts =
    useMemo(() => {
      return properties.filter((p) =>
        favoriteIds.includes(
          String(p.id)
        )
      );
    }, [
      properties,
      favoriteIds,
    ]);

  // ===== NOT LOGIN =====
  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
        }}
      >
        <p>
          Vui lòng đăng nhập
        </p>

        <Link href="/auth/login">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  // ===== LOADING =====
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Đang tải...
      </div>
    );
  }

  // ===== EMPTY =====
  if (favoritePosts.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
        }}
      >
        <p>
          Bạn chưa lưu tin nào ❤️
        </p>

        <Link href="/properties">
          Khám phá nhà đất ngay
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* TITLE */}
      <h1>
        Tin đã lưu (
        {
          favoritePosts.length
        }
        )
      </h1>

      {/* LIST */}
      <div
        style={{
          marginTop: 20,
        }}
      >
        {favoritePosts.map(
          (item) => {
            const itemId =
              String(item.id);

            return (
              <div
                key={itemId}
                style={{
                  background:
                    "#fff",

                  padding: 15,

                  marginBottom: 15,

                  borderRadius: 12,

                  display: "flex",

                  gap: 15,

                  alignItems:
                    "center",

                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* IMAGE */}
                <img
                  src={
                    item.thumbnail
                  }
                  alt={
                    item.title
                  }
                  style={{
                    width: 140,

                    height: 90,

                    objectFit:
                      "cover",

                    borderRadius: 8,
                  }}
                />

                {/* INFO */}
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    💰{" "}
                    {item.price} tỷ
                  </p>

                  <p>
                    📍{" "}
                    {
                      item.address
                    }
                  </p>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display:
                      "flex",

                    flexDirection:
                      "column",

                    gap: 10,
                  }}
                >
                  {/* VIEW */}
                  <Link
                    href={`/properties/${itemId}`}
                  >
                    <button>
                      👁️ Xem
                    </button>
                  </Link>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      dispatch(
                        toggleFavoriteAPI(
                          String(
                            user.id
                          ),
                          itemId
                        )
                      )
                    }
                  >
                    ❌ Bỏ lưu
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}