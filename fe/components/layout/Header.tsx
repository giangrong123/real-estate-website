// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import dynamic from "next/dynamic";
// import { usePathname } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";

// import type { AppDispatch, RootState } from "@/stores/store";

// import {
//   fetchFavorites,
//   resetFavorites,
// } from "@/stores/slices/favoriteSlice";

// import styles from "./styles/Header.module.css";
// import HeartIcon from "@/components/icons/HeartIcon";

// // ===== CLIENT ONLY =====
// const UserMenu = dynamic(() => import("./UserMenu"), {
//   ssr: false,
// });

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   const pathname = usePathname();
//   const dispatch = useDispatch<AppDispatch>();

//   // ===== AUTH =====
//   const { isLoggedIn, user } = useSelector(
//     (state: RootState) => state.auth
//   );

//   // ===== FAVORITES =====
// const favorites = useSelector((state: RootState) =>
//   Array.isArray(state.favorites.favorites)
//     ? state.favorites.favorites
//     : []
// );

// const loading = useSelector(
//   (state: RootState) => state.favorites.loading
// );

//   // ===== FETCH / RESET FAVORITES =====
//   useEffect(() => {
//     if (!isLoggedIn || !user?.id) {
//       // 🚨 quan trọng: logout là phải reset ngay
//       dispatch(resetFavorites());
//       return;
//     }

//     dispatch(fetchFavorites(String(user.id)));
//   }, [dispatch, isLoggedIn, user?.id]);

//   // ===== ACTIVE LINK =====
//   const isActive = (path: string) =>
//     pathname.startsWith(path);

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         {/* LOGO */}
//         <div className={styles.logo}>
//           <Link href="/">
//             <img
//               src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg"
//               alt="Logo"
//             />
//           </Link>
//         </div>

//         {/* MOBILE MENU */}
//         <div
//           className={styles.menuToggle}
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </div>

//         {/* NAV */}
//         <nav
//           className={`${styles.nav} ${
//             open ? styles.activeNav : ""
//           }`}
//         >
//           <ul>
//             <li>
//               <Link
//                 href="/properties"
//                 className={`${styles.navLink} ${
//                   isActive("/properties")
//                     ? styles.active
//                     : ""
//                 }`}
//               >
//                 Nhà đất bán
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/projects"
//                 className={`${styles.navLink} ${
//                   isActive("/projects")
//                     ? styles.active
//                     : ""
//                 }`}
//               >
//                 Dự án
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/news"
//                 className={`${styles.navLink} ${
//                   isActive("/news")
//                     ? styles.active
//                     : ""
//                 }`}
//               >
//                 Tin tức
//               </Link>
//             </li>

//             {/* MOBILE AUTH */}
//             <div className={styles.mobileAuth}>
//               <UserMenu />

//               <Link href="/user/favorites" className={styles.navLink}>
//                 Tin yêu thích (
//                 {loading ? "..." : favorites.length})
//               </Link>

//               <Link
//                 href="/user/post/create"
//                 className={styles.btnPost}
//               >
//                 Đăng tin
//               </Link>
//             </div>
//           </ul>
//         </nav>

//         {/* RIGHT ACTIONS */}
//         <div className={styles.actions}>
//           {/* FAVORITES */}
//           <Link
//             href="/user/favorites"
//             className={`${styles.favorite} ${
//               isActive("/user/favorites")
//                 ? styles.active
//                 : ""
//             }`}
//           >
//             <HeartIcon active={favorites.length > 0} />

//             {favorites.length > 0 && (
//               <span className={styles.badge}>
//                 {favorites.length > 99
//                   ? "99+"
//                   : favorites.length}
//               </span>
//             )}
//           </Link>

//           {/* USER */}
//           <UserMenu />

//           {/* POST */}
//           <Link
//             href="/user/post/create"
//             className={styles.btnPost}
//           >
//             Đăng tin
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch, RootState } from "@/stores/store";

import {
  fetchFavorites,
  resetFavorites,
} from "@/stores/slices/favoriteSlice";

import styles from "./styles/Header.module.css";
import HeartIcon from "@/components/icons/HeartIcon";

// ===== CLIENT ONLY =====
const UserMenu = dynamic(() => import("./UserMenu"), {
  ssr: false,
});

export default function Header() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  // ===== AUTH =====
  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.auth
  );

  // ===== FAVORITES (FIXED) =====
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );

  const loading = useSelector(
    (state: RootState) => state.favorites.loading
  );

  // ===== FETCH / RESET FAVORITES =====
  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      dispatch(resetFavorites());
      return;
    }

    dispatch(fetchFavorites(String(user.id)));
  }, [dispatch, isLoggedIn, user?.id]);

  // ===== ACTIVE LINK =====
  const isActive = (path: string) =>
    pathname.startsWith(path);

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

        {/* MOBILE MENU */}
        <div
          className={styles.menuToggle}
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

        {/* NAV */}
        <nav
          className={`${styles.nav} ${
            open ? styles.activeNav : ""
          }`}
        >
          <ul>
            <li>
              <Link
                href="/properties"
                className={`${styles.navLink} ${
                  isActive("/properties")
                    ? styles.active
                    : ""
                }`}
              >
                Nhà đất bán
              </Link>
            </li>

            <li>
              <Link
                href="/projects"
                className={`${styles.navLink} ${
                  isActive("/projects")
                    ? styles.active
                    : ""
                }`}
              >
                Dự án
              </Link>
            </li>

            <li>
              <Link
                href="/news"
                className={`${styles.navLink} ${
                  isActive("/news")
                    ? styles.active
                    : ""
                }`}
              >
                Tin tức
              </Link>
            </li>

            {/* MOBILE AUTH */}
            <div className={styles.mobileAuth}>
              <UserMenu />

              <Link
                href="/user/favorites"
                className={styles.navLink}
              >
                Tin yêu thích (
                {loading ? "..." : favoriteIds.length})
              </Link>

              <Link
                href="/user/post/create"
                className={styles.btnPost}
              >
                Đăng tin
              </Link>
            </div>
          </ul>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className={styles.actions}>
          {/* FAVORITES */}
          <Link
            href="/user/favorites"
            className={`${styles.favorite} ${
              isActive("/user/favorites")
                ? styles.active
                : ""
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

          {/* USER */}
          <UserMenu />

          {/* POST */}
          <Link
            href="/user/post/create"
            className={styles.btnPost}
          >
            Đăng tin
          </Link>
        </div>
      </div>
    </header>
  );
}