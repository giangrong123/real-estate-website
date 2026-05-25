"use client";

import Link from "next/link";

import { useEffect, useMemo } from "react";

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

import styles from "./post.module.css";

export default function UserPosts() {
  const dispatch =
    useDispatch<AppDispatch>();

  // ===== STORE =====
  const {
    properties,
    loading,
    error,
  } = useSelector(
    (state: RootState) =>
      state.properties
  );

  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );

  // ===== FETCH =====
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

  // ===== DELETE =====
  const handleDelete = async (
    id: number
  ) => {
    const ok = confirm(
      "Bạn có chắc muốn xoá tin này?"
    );

    if (!ok) return;

    try {
      await dispatch(
        deleteProperty(id)
      );

      alert("Xóa thành công 🎉");
    } catch {
      alert("Xóa thất bại");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Tin đã đăng</h1>

        <Link href="/user/post/create">
          <button
            className={styles.addBtn}
          >
            + Đăng tin
          </button>
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className={styles.loading}>
          Đang tải...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

      {/* EMPTY */}
      {!loading &&
        myPosts.length === 0 && (
          <div className={styles.empty}>
            Chưa có tin nào
          </div>
        )}

      {/* LIST */}
      <div className={styles.list}>
        {myPosts.map((post) => (
          <div
            key={post.id}
            className={styles.card}
          >
            {/* LEFT */}
            <div className={styles.left}>
              <img
                src={post.thumbnail}
                className={
                  styles.thumb
                }
                alt={post.title}
              />

              <div
                className={
                  styles.info
                }
              >
                <h3>{post.title}</h3>

                <p
                  className={
                    styles.price
                  }
                >
                  {post.price} tỷ
                </p>

                <p
                  className={
                    styles.address
                  }
                >
                  {post.address}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className={
                styles.actions
              }
            >
              {/* EDIT */}
              <Link
                href={`/user/post/edit/${post.id}`}
              >
                <button
                  className={
                    styles.btnEdit
                  }
                >
                  ✏️ Sửa
                </button>
              </Link>

              {/* DELETE */}
              <button
                onClick={() =>
                  handleDelete(post.id)
                }
                className={
                  styles.btnDelete
                }
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