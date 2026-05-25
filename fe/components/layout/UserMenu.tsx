"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "@/stores/store";
import { logout } from "@/stores/slices/authSlice";

import styles from "./styles/Header.module.css";

export default function UserMenu() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  if (!isLoggedIn || !user) {
    return (
      <>
        <Link
          href="/auth/login"
          className={styles.btnOutline}
        >
          Đăng nhập
        </Link>

        <Link
          href="/auth/register"
          className={styles.btnPrimary}
        >
          Đăng ký
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/user"
        className={styles.userProfile}
      >
        <img
          src={
            user.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={user.name || "User"}
          className={styles.avatar}
        />

        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {user.name || "Người dùng"}
          </span>

          <span className={styles.userRole}>
            Thành viên
          </span>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className={styles.btnOutline}
      >
        Đăng xuất
      </button>
    </>
  );
}