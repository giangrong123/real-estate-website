"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, } from "@/stores/slices/authSlice";
import type { RootState, AppDispatch, } from "@/stores/store";
import styles from "./admin-login.module.css";

// ===================== TYPES =====================

type FormType = {
  email: string;
  password: string;
};

// ===================== COMPONENT =====================

export default function AdminLoginPage() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, } = useSelector(
    (state: RootState) => state.auth
  );
  const [errText, setErrText] = useState("");
  // ===================== STATE =====================

  const [form, setForm] =
    useState<FormType>({
      email: "",
      password: "",
    });

  const [errors, setErrors] = useState<Partial<FormType>>({});

  // ===================== HANDLE CHANGE =====================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    // clear error
    if (
      errors[
      e.target
        .name as keyof FormType
      ]
    ) {
      setErrors({
        ...errors,
        [e.target.name]:
          undefined,
      });
    }
  };

  // ===================== VALIDATE =====================

  const validate = () => {
    const newErrors:
      Partial<FormType> = {};

    // email
    if (!form.email) {
      newErrors.email =
        "Vui lòng nhập email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Email không đúng định dạng";
    }

    // password
    if (!form.password) {
      newErrors.password =
        "Vui lòng nhập mật khẩu";
    } else if (
      form.password
        .length < 6
    ) {
      newErrors.password =
        "Mật khẩu tối thiểu 6 ký tự";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ===================== SUBMIT =====================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await dispatch(adminLogin(form));
      router.push("/admin");
    } catch (err: any) {
      if (err?.status === 401) {
        setErrText("Sai tên đăng nhập hoặc password");
        // alert("Lỗi tài khoản mật khẩu");
      } else if (err?.status === 500) {
        alert("Lỗi server");
      } else {
        alert("Lỗi kết nối mạng mạng hoặc lỗi không xác định");
      }
    }
  };

  // ===================== UI =====================

  return (
    <div
      className={
        styles.wrapper
      }
    >
      <div
        className={
          styles.card
        }
      >
        {/* LEFT */}
        <div
          className={
            styles.imageBox
          }
        >
          <div
            className={
              styles.overlay
            }
          >
            <h2>
              Admin Panel
            </h2>

            <p>
              Đăng nhập để
              quản trị hệ
              thống
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={
            styles.formBox
          }
        >
          <h1>
            Admin Login
          </h1>

          {/* ERROR */}
          {error && (
            <p
              className={
                styles.error
              }
            >
              {error}
            </p>
          )}

          {errText && (
            <span>{errText}</span>
          )}

          {/* FORM */}
          <form
            className={
              styles.form
            }
            onSubmit={
              handleSubmit
            }
          >
            {/* EMAIL */}
            <div
              className={
                styles.group
              }
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                disabled={
                  loading
                }
              />

              {errors.email && (
                <span
                  className={
                    styles.error
                  }
                >
                  {
                    errors.email
                  }
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div
              className={
                styles.group
              }
            >
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                disabled={
                  loading
                }
              />

              {errors.password && (
                <span
                  className={
                    styles.error
                  }
                >
                  {
                    errors.password
                  }
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                loading
              }
            >
              {loading
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}