"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

// Import từ đúng các folder Redux thuần
import { logout } from "@/stores/slices/authSlice";
// Giả sử bạn không dùng login ở đây thì có thể bỏ qua import login
import type { RootState } from "@/stores/store"; 

import styles from "./styles/Header.module.css";
import HeartIcon from "@/components/icons/HeartIcon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // 1. Lấy dữ liệu user từ auth store
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  console.log("Header check:", { isLoggedIn, userEmail: user?.email });

  // 2. Lấy danh sách ID yêu thích từ favorites store
  // Lưu ý: state.favorites.favoriteIds (khớp với tên biến trong reducer ta vừa viết)
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds || []
  );

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
  logout(dispatch); // Truyền dispatch vào hàm logout đã import từ authSlice
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
              {user ? (
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
              
              {/* Thêm link yêu thích cho mobile nếu cần */}
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
          
          {/* ❤️ FAVORITE - Đã được sửa lại logic badge */}
          <Link
            href="/user/favorites"
            className={`${styles.favorite} ${
              isActive("/user/favorites") ? styles.active : ""
            }`}
          >
            {/* HeartIcon sáng lên khi có tin yêu thích */}
            <HeartIcon active={favoriteIds.length > 0} />

            {favoriteIds.length > 0 && (
              <span className={styles.badge}>
                {favoriteIds.length > 99 ? "99+" : favoriteIds.length}
              </span>
            )}
          </Link>
          
          {/* AUTH */}
          {isLoggedIn && user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
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