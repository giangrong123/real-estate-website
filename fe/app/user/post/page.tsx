"use client";

import Link from "next/link";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchProperties,
  deleteProperty,
} from "@/stores/slices/propertySlice";

import type {
  RootState,
  AppDispatch,
} from "@/stores/store";

export default function UserPosts() {
  const dispatch = useDispatch<AppDispatch>();

  // ===== REDUX =====
  const { properties, loading, error } =
    useSelector(
      (state: RootState) => state.properties
    );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  // ===== FETCH POSTS =====
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // ===== FILTER MY POSTS =====
  const myPosts = properties.filter(
    (item) =>
      item.user_id === Number(user?.id)
  );

  // ===== DELETE =====
  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete = confirm(
      "Bạn có chắc muốn xoá tin này?"
    );

    if (!confirmDelete) return;

    dispatch(deleteProperty(id));
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>Tin đã đăng</h1>

        <Link href="/user/post/create">
          <button
            style={{
              padding:
                "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            + Đăng tin
          </button>
        </Link>
      </div>

      {/* ===== LOADING ===== */}
      {loading && (
        <p>Đang tải dữ liệu...</p>
      )}

      {/* ===== ERROR ===== */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* ===== EMPTY ===== */}
      {!loading &&
        myPosts.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <p>
              Bạn chưa đăng tin nào
            </p>
          </div>
        )}

      {/* ===== LIST ===== */}
      <div
        style={{
          marginTop: 20,
        }}
      >
        {myPosts.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              padding: 15,
              marginBottom: 12,
              borderRadius: 12,
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* ===== LEFT ===== */}
            <div
              style={{
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                style={{
                  width: 120,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />

              <div>
                <h3
                  style={{
                    marginBottom: 6,
                  }}
                >
                  {post.title}
                </h3>

                <p>
                  💰 {post.price} tỷ
                </p>

                <p>
                  📍 {post.address}
                </p>

                <p>
                  📐 {post.area} m²
                </p>

                {/* ===== STATUS ===== */}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  {post.is_approved ? (
                    <span
                      style={{
                        color: "green",
                        fontWeight: 600,
                      }}
                    >
                      ✔ Đã duyệt
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "orange",
                        fontWeight: 600,
                      }}
                    >
                      ⏳ Chờ duyệt
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ===== ACTION ===== */}
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <Link
                href={`/user/post/edit/${post.id}`}
              >
                <button
                  style={{
                    cursor: "pointer",
                    padding:
                      "8px 12px",
                    borderRadius: 8,
                  }}
                >
                  ✏️ Sửa
                </button>
              </Link>

              <button
                onClick={() =>
                  handleDelete(post.id)
                }
                style={{
                  color: "red",
                  cursor: "pointer",
                  padding:
                    "8px 12px",
                  borderRadius: 8,
                }}
              >
                🗑️ Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}