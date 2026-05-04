"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "@/stores/store";
import { logout } from "@/stores/slices/authSlice";
import { fetchFavorites } from "@/stores/slices/favoriteSlice";

import styles from "./styles/Header.module.css";
import HeartIcon from "@/components/icons/HeartIcon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const hasLoaded = useRef(false); // 🔥 tránh gọi API nhiều lần

  // AUTH
  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.auth
  );

  // FAVORITE
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds || []
  );

  // 🔥 LOAD FAVORITES KHI LOGIN
  useEffect(() => {
    if (isLoggedIn && user?.id && !hasLoaded.current) {
      dispatch(fetchFavorites(String(user.id)));
      hasLoaded.current = true;
    }
  }, [isLoggedIn, user?.id, dispatch]);

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

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
        <div
          className={styles.menuToggle}
          onClick={() => setOpen(!open)}
        >
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
                href="/projects"
                className={`${styles.navLink} ${
                  isActive("/projects") ? styles.active : ""
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
              {isLoggedIn && user ? (
                <>
                  <span>{user.email}</span>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className={styles.btnOutline}>
                    Đăng nhập
                  </Link>

                  <Link href="/auth/register" className={styles.btnPrimary}>
                    Đăng ký
                  </Link>
                </>
              )}

              <Link href="/user/favorites" className={styles.navLink}>
                Tin yêu thích ({favoriteIds.length})
              </Link>

              <Link href="/user/post/create" className={styles.btnPost}>
                Đăng tin
              </Link>
            </div>
          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className={styles.actions}>
          {/* ❤️ FAVORITE */}
          <Link
            href="/user/favorites"
            className={`${styles.favorite} ${
              isActive("/user/favorites") ? styles.active : ""
            }`}
          >
            <HeartIcon active={favoriteIds.length > 0} />

            {favoriteIds.length > 0 && (
              <span className={styles.badge}>
                {favoriteIds.length > 99
                  ? "99+"
                  : favoriteIds.length}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {isLoggedIn && user ? (
            <>
              <span className={styles.userEmail}>
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className={styles.btnOutline}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.btnOutline}>
                Đăng nhập
              </Link>

              <Link href="/auth/register" className={styles.btnPrimary}>
                Đăng ký
              </Link>
            </>
          )}

          <Link href="/user/post/create" className={styles.btnPost}>
            Đăng tin
          </Link>
        </div>
      </div>
    </header>
  );
}