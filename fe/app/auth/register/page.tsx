"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  register,
} from "@/stores/slices/authSlice";

import type {
  RootState,
  AppDispatch,
} from "@/stores/store";

import styles from "./register.module.css";

// ===================== TYPES =====================

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors =
  Partial<FormValues>;

// ===================== COMPONENT =====================

export default function RegisterPage() {
  const router =
    useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const {
    user,
    loading,
    error,
  } = useSelector(
    (
      state: RootState
    ) => state.auth
  );

  // ===================== STATE =====================

  const [form, setForm] =
    useState<FormValues>({
      name: "",
      email: "",
      password: "",
      confirmPassword:
        "",
    });

  const [errors, setErrors] =
    useState<FormErrors>(
      {}
    );

  // ===================== REDIRECT =====================

  useEffect(() => {
    if (user) {
      if (
        user.role ===
        "admin"
      ) {
        router.replace(
          "/admin"
        );
      } else {
        router.replace(
          "/user"
        );
      }
    }
  }, [user, router]);

  // ===================== HANDLE CHANGE =====================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error
    if (
      errors[
        name as keyof FormErrors
      ]
    ) {
      setErrors(
        (prev) => ({
          ...prev,
          [name]:
            undefined,
        })
      );
    }
  };

  // ===================== VALIDATE =====================

  const validate =
    (): FormErrors => {
      const newErrors: FormErrors =
        {};

      // name
      if (
        !form.name.trim()
      ) {
        newErrors.name =
          "Vui lòng nhập họ và tên";
      }

      // email
      if (!form.email) {
        newErrors.email =
          "Vui lòng nhập email";
      } else if (
        !/\S+@\S+\.\S+/.test(
          form.email
        )
      ) {
        newErrors.email =
          "Email không hợp lệ";
      }

      // password
      if (
        !form.password
      ) {
        newErrors.password =
          "Vui lòng nhập mật khẩu";
      } else if (
        form.password
          .length < 6
      ) {
        newErrors.password =
          "Mật khẩu phải ít nhất 6 ký tự";
      }

      // confirm password
      if (
        form.confirmPassword !==
        form.password
      ) {
        newErrors.confirmPassword =
          "Mật khẩu không khớp";
      }

      return newErrors;
    };

  // ===================== SUBMIT =====================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      const validationErrors =
        validate();

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {
        setErrors(
          validationErrors
        );

        return;
      }

      setErrors({});

      await dispatch(
        register({
          name:
            form.name,
          email:
            form.email,
          password:
            form.password,
        })
      );
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
              Tạo tài
              khoản
            </h2>

            <p>
              Tham gia
              cùng chúng
              tôi ngay
              hôm nay
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
            Đăng ký
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

          {/* FORM */}
          <form
            className={
              styles.form
            }
            onSubmit={
              handleSubmit
            }
          >
            {/* NAME */}
            <div
              className={
                styles.field
              }
            >
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                disabled={
                  loading
                }
                className={
                  errors.name
                    ? styles.inputError
                    : ""
                }
              />

              {errors.name && (
                <p
                  className={
                    styles.error
                  }
                >
                  {
                    errors.name
                  }
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div
              className={
                styles.field
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
                className={
                  errors.email
                    ? styles.inputError
                    : ""
                }
              />

              {errors.email && (
                <p
                  className={
                    styles.error
                  }
                >
                  {
                    errors.email
                  }
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div
              className={
                styles.field
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
                className={
                  errors.password
                    ? styles.inputError
                    : ""
                }
              />

              {errors.password && (
                <p
                  className={
                    styles.error
                  }
                >
                  {
                    errors.password
                  }
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div
              className={
                styles.field
              }
            >
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={
                  form.confirmPassword
                }
                onChange={
                  handleChange
                }
                disabled={
                  loading
                }
                className={
                  errors.confirmPassword
                    ? styles.inputError
                    : ""
                }
              />

              {errors.confirmPassword && (
                <p
                  className={
                    styles.error
                  }
                >
                  {
                    errors.confirmPassword
                  }
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                loading
              }
              className={
                styles.btnSubmit
              }
            >
              {loading
                ? "Đang xử lý..."
                : "Đăng ký"}
            </button>
          </form>

          {/* LOGIN */}
          <p
            className={
              styles.switch
            }
          >
            Đã có tài
            khoản?{" "}
            <Link href="/auth/login">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}