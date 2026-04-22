"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.adminWrapper}>
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${open ? styles.active : ""}`}>
        <h2 className={styles.logo}>Admin</h2>

        <nav className={styles.menu}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/properties">Bất động sản</Link>
          <Link href="/admin/user">Users</Link>
          <Link href="/admin/post">Bài viết</Link>
        </nav>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* CONTENT */}
      <main className={styles.content}>
        <button
          className={styles.menuBtn}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {children}
      </main>
    </div>
  );
}