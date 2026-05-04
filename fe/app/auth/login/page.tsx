"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/stores/slices/authSlice";
import { RootState } from "@/stores/store";
import styles from "./login.module.css";
import { AppDispatch } from "@/stores/store";
type FormType = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn, loading, error, user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<FormType>({ email: "", password: "" })

  const [errors, setErrors] = useState<Partial<FormType>>({});

  useEffect(() => {
  if (isLoggedIn && user) {
    if (user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/user");
    }
  }
}, [isLoggedIn, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormType]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: Partial<FormType> = {};
    if (!form.email) newErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Email không đúng định dạng";

    if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 6) newErrors.password = "Mật khẩu tối thiểu 6 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("🚀 Gọi login với:", form);
    dispatch(login(form));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imageBox}>
          <div className={styles.overlay}>
            <h2>Chào mừng trở lại</h2>
            <p>Đăng nhập để tiếp tục sử dụng dịch vụ</p>
          </div>
        </div>

        <div className={styles.formBox}>
          <h1>Đăng nhập</h1>

          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} disabled={loading} />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.group}>
              <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} disabled={loading} />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className={styles.switch}>
            Chưa có tài khoản? <Link href="/account/user/registers">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
