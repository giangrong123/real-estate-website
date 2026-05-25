"use client";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./setting.module.css";

import type {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  updateUser,
  changePassword,
} from "@/stores/slices/authSlice";

// ================= TYPES =================

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserSettings() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // ================= PROFILE FORM =================

  const {
    register,
    handleSubmit,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  // ================= PASSWORD FORM =================

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    reset,
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // ================= UPDATE PROFILE =================

  const onSubmit = (data: ProfileFormData) => {
    dispatch(updateUser(data));
  };

  // ================= CHANGE PASSWORD =================

  const onChangePassword = (
    data: PasswordFormData
  ) => {
    if (
      data.newPassword !== data.confirmPassword
    ) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    dispatch(
      changePassword({
        currentPassword:
          data.currentPassword,

        newPassword: data.newPassword,
      })
    );

    reset();
  };

  return (
    <div className={styles.wrapper}>
      {/* TITLE */}
      <h1 className={styles.title}>
        Cài đặt tài khoản
      </h1>

      {/* ================= PROFILE ================= */}

      <form
        className={styles.card}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.subTitle}>
          Thông tin cá nhân
        </h2>

        {/* NAME */}
        <div className={styles.group}>
          <label>Tên</label>

          <input
            type="text"
            placeholder="Nhập tên"
            {...register("name")}
          />
        </div>

        {/* EMAIL */}
        <div className={styles.group}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Nhập email"
            {...register("email")}
          />
        </div>

        {/* PHONE */}
        <div className={styles.group}>
          <label>Số điện thoại</label>

          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            {...register("phone")}
          />
        </div>

        <button
          className={styles.button}
          disabled={loading}
        >
          {loading
            ? "Đang lưu..."
            : "Lưu thay đổi"}
        </button>
      </form>

      {/* DIVIDER */}
      <div className={styles.divider}></div>

      {/* ================= PASSWORD ================= */}

      <form
        className={styles.card}
        onSubmit={handlePasswordSubmit(
          onChangePassword
        )}
      >
        <h2 className={styles.subTitle}>
          Đổi mật khẩu
        </h2>

        {/* CURRENT PASSWORD */}
        <div className={styles.group}>
          <label>Mật khẩu hiện tại</label>

          <input
            type="password"
            placeholder="Nhập mật khẩu hiện tại"
            {...passwordRegister(
              "currentPassword"
            )}
          />
        </div>

        {/* NEW PASSWORD */}
        <div className={styles.group}>
          <label>Mật khẩu mới</label>

          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            {...passwordRegister(
              "newPassword"
            )}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className={styles.group}>
          <label>Xác nhận mật khẩu</label>

          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            {...passwordRegister(
              "confirmPassword"
            )}
          />
        </div>

        <button
          className={styles.button}
          disabled={loading}
        >
          {loading
            ? "Đang cập nhật..."
            : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}