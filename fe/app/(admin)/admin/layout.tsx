"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    }
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {

    // xoá token
    localStorage.removeItem(
      "token"
    );

    // xoá user
    localStorage.removeItem(
      "user"
    );

    // về login
    router.push(
      "/admin/login"
    );
  };

  return (
    <div
      className={
        styles.adminWrapper
      }
    >

      {/* SIDEBAR */}
      <aside
        className={`
          ${styles.sidebar}
          ${open
            ? styles.active
            : ""}
        `}
      >

        <h2
          className={
            styles.logo
          }
        >
          Admin
        </h2>

        <nav
          className={
            styles.menu
          }
        >

          <Link href="/admin">
            Dashboard
          </Link>

          <Link href="/admin/properties">
            Bất động sản
          </Link>

          <Link href="/admin/user">
            Users
          </Link>

          <Link href="/admin/project">
            Dự án
          </Link>

          <Link href="/admin/news">
            Tin tức
          </Link>

        </nav>

        {/* LOGOUT */}
        <button
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          className={
            styles.overlay
          }
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* CONTENT */}
      <main
        className={
          styles.content
        }
      >

        <button
          className={
            styles.menuBtn
          }
          onClick={() =>
            setOpen(!open)
          }
        >
          ☰
        </button>

        {children}

      </main>
    </div>
  );
}