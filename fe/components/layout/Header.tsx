"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles/Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <div className={styles.logo}>
          <Link href="/">
            <img
              src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <div className={styles.menuToggle} onClick={() => setOpen(!open)}>
          ☰
        </div>

        {/* NAV */}
        <nav className={`${styles.nav} ${open ? styles.activeNav : ""}`}>
          <ul>
            <li>
              <Link
                href="/properties"
                className={`${styles.navLink} ${
                  isActive("/properties") ? styles.active : ""
                }`}
              >
                Nhà đất bán
              </Link>
            </li>

            <li>
              <Link
                href="/project"
                className={`${styles.navLink} ${
                  isActive("/project") ? styles.active : ""
                }`}
              >
                Dự án
              </Link>
            </li>

            <li>
              <Link
                href="/news"
                className={`${styles.navLink} ${
                  isActive("/news") ? styles.active : ""
                }`}
              >
                Tin tức
              </Link>
            </li>

            {/* MOBILE AUTH */}
            <div className={styles.mobileAuth}>
              <Link href="/logins" className={styles.btnOutline}>
                Đăng nhập
              </Link>
              <Link href="/registers" className={styles.btnPrimary}>
                Đăng ký
              </Link>
              <Link href="/posts" className={styles.btnPost}>
                Đăng tin
              </Link>
            </div>
          </ul>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className={styles.actions}>
          <Link href="/auth/login" className={styles.btnOutline}>
            Đăng nhập
          </Link>
          <Link href="/auth/register" className={styles.btnPrimary}>
            Đăng ký
          </Link>
          <Link href="/account/user/posts" className={styles.btnPost}>
            Đăng tin
          </Link>
        </div>
      </div>
    </header>
  );
}