"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/stores/store";
import { createNews } from "@/stores/slices/newsSlice";

import styles from "./create-news.module.css";

export default function CreateNewsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // ================= STATE =================
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= VALIDATE =================
  const validateForm = () => {
    if (!title.trim()) {
      return "Vui lòng nhập tiêu đề";
    }

    if (!thumbnail.trim()) {
      return "Vui lòng nhập thumbnail";
    }

    if (!excerpt.trim()) {
      return "Vui lòng nhập mô tả ngắn";
    }

    if (!content.trim()) {
      return "Vui lòng nhập nội dung";
    }

    return "";
  };

  // ================= SUBMIT =================
  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await dispatch(
        createNews({
          title,
          thumbnail,
          excerpt,
          content,
        })
      );

      alert("Tạo news thành công");

      router.push("/admin/news");
    } catch (err) {
      setError("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Tạo News
      </h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Thumbnail"
          value={thumbnail}
          onChange={(e) =>
            setThumbnail(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Mô tả ngắn"
          value={excerpt}
          onChange={(e) =>
            setExcerpt(e.target.value)
          }
        />

        <textarea
          placeholder="Nội dung"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang tạo..."
            : "Tạo News"}
        </button>
      </form>
    </div>
  );
}