"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import { toggleFavoriteAPI, fetchFavorites } from "@/stores/slices/favoriteSlice";
import { fetchProperties } from "@/stores/slices/propertySlice";
import { useEffect } from "react";

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();

  const { favoriteIds } = useSelector(
    (state: RootState) => state.favorites
  );

  const { allProperties } = useSelector(
    (state: RootState) => state.properties
  );

  // 🔥 load data khi vào trang
  useEffect(() => {
    dispatch(fetchFavorites("1")); // favorite
    if (allProperties.length === 0) {
      dispatch(fetchProperties()); // properties
    }
  }, [dispatch, allProperties.length]);

  const favoritePosts = allProperties.filter((p) =>
    favoriteIds.includes(String(p.id))
  );

  if (favoritePosts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Bạn chưa lưu tin nào ❤️</p>
        <Link href="/properties">
          Khám phá nhà đất ngay
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <h1>
        Tin đã lưu ({favoritePosts.length})
      </h1>

      <div style={{ marginTop: 20 }}>
        {favoritePosts.map((item) => {
          const itemId = String(item.id);

          return (
            <div
              key={itemId}
              style={{
                background: "#fff",
                padding: 15,
                marginBottom: 10,
                borderRadius: 10,
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: 120, height: 80, objectFit: "cover" }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.price} tỷ</p>
                <p>{item.address}</p>
              </div>

              <div>
                <Link href={`/properties/${itemId}`}>
                  <button>👁️ Xem</button>
                </Link>

                <button
                  onClick={() =>
                    dispatch(toggleFavoriteAPI("1", itemId))
                  }
                >
                  ❌ Bỏ lưu
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}