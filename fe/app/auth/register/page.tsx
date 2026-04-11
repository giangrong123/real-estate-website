"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<FormValues>;

export default function RegisterPage() {
  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải ít nhất 6 ký tự";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Form hợp lệ:", form);

    // 👉 Sau này call API ở đây
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* LEFT IMAGE */}
        <div className={styles.imageBox}>
          <div className={styles.overlay}>
            <h2>Tạo tài khoản</h2>
            <p>Tham gia cùng chúng tôi ngay hôm nay</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formBox}>
          <h1>Đăng ký</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* NAME */}
            <div className={styles.field}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ""}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className={styles.field}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className={styles.field}>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? styles.inputError : ""}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className={styles.field}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.inputError : ""}
              />
              {errors.confirmPassword && (
                <p className={styles.error}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Đăng ký
            </button>
          </form>

          <p className={styles.switch}>
            Đã có tài khoản?{" "}
            <Link href="/account/user/logins">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}