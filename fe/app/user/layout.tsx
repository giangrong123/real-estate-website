"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./user.module.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    { label: "Dashboard", href: "/user" },
    { label: "Tin đã đăng", href: "/user/post" },
    { label: "Tin đã lưu", href: "/user/favorites" },
    { label: "Cài đặt", href: "/user/setting" },
  ];

  // 🔐 AUTH GUARD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Estate User</h2>

        <nav className={styles.nav}>
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}