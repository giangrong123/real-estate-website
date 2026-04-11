"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

type FormType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormType>>({});

  // ===== HANDLE CHANGE =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== VALIDATE =====
  const validate = () => {
    const newErrors: Partial<FormType> = {};

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
    }

    return newErrors;
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("LOGIN DATA:", form);

    // Sau này gọi API:
    // await fetch("http://localhost:5000/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        {/* LEFT IMAGE */}
        <div className={styles.imageBox}>
          <div className={styles.overlay}>
            <h2>Chào mừng trở lại</h2>
            <p>Đăng nhập để tiếp tục sử dụng dịch vụ</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formBox}>
          <h1>Đăng nhập</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.group}>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>

            <button type="submit">Đăng nhập</button>
          </form>

          <p className={styles.switch}>
            Chưa có tài khoản?{" "}
            <Link href="/account/user/registers">Đăng ký</Link>
          </p>
        </div>

      </div>
    </div>
  );
}