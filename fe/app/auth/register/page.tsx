"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/stores/slices/authSlice";
import { RootState } from "@/stores/store";
import { User } from "@/types/user"; // Import interface User
import styles from "./register.module.css";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<FormValues>;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Lấy thông tin user từ store để kiểm tra trạng thái đăng nhập
  const user = useSelector((state: RootState) => state.auth.user);

  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 Nếu đã đăng nhập rồi thì không cho ở lại trang Register
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
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
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      /**
       * MÔ PHỎNG LUỒNG FULLSTACK:
       * 1. Gửi form (email, password, name) lên Backend (NodeJS/NestJS).
       * 2. Backend tạo User trong Database và trả về Object User kèm ID.
       */
      
      // Giả lập dữ liệu nhận về từ API thành công
      const mockUserFromBE: User = {
        id: Date.now(), // ID tạm thời từ client
        name: form.name,
        email: form.email,
        avatar: "",    // Các trường optional có thể để rỗng
        phone: "",
        phone_masked: ""
      };

      // 🔥 Lưu vào Redux Store (Tự động đăng nhập)
      dispatch(login(mockUserFromBE));

      // Điều hướng về trang chủ
      router.replace("/");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imageBox}>
          <div className={styles.overlay}>
            <h2>Tạo tài khoản</h2>
            <p>Tham gia cùng chúng tôi ngay hôm nay</p>
          </div>
        </div>

        <div className={styles.formBox}>
          <h1>Đăng ký</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.name ? styles.inputError : ""}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.field}>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.password ? styles.inputError : ""}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            <div className={styles.field}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.confirmPassword ? styles.inputError : ""}
              />
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className={styles.btnSubmit}>
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <p className={styles.switch}>
            Đã có tài khoản? <Link href="/auth/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}