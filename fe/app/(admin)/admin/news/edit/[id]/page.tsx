"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  AppDispatch,
} from "@/stores/store";

import {
  updateNews,
  fetchNewsById,
} from "@/stores/slices/newsSlice";

import styles from "./edit-news.module.css";

export default function EditNewsPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      title: "",
      thumbnail: "",
      excerpt: "",
      content: "",
    });

  // ================= LOAD DATA =================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const news =
          await dispatch(
            fetchNewsById(
              Number(id)
            ) as any
          );

        setForm({
          title:
            news.title || "",

          thumbnail:
            news.thumbnail || "",

          excerpt:
            news.excerpt || "",

          content:
            news.content || "",
        });
      } catch (err) {
        console.log(err);

        setError(
          "Không thể tải dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, dispatch]);

  // ================= HANDLE CHANGE =================

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await dispatch(
        updateNews(
          Number(id),
          form
        ) as any
      );

      alert(
        "Cập nhật thành công"
      );

      router.push(
        "/admin/news"
      );
    } catch (err) {
      console.log(err);

      setError(
        "Có lỗi xảy ra"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}

      <div className={styles.header}>
        <div>
          <h1
            className={
              styles.title
            }
          >
            Edit News
          </h1>

          <p
            className={
              styles.subtitle
            }
          >
            Chỉnh sửa bài viết
          </p>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleSubmit
        }
        className={
          styles.form
        }
      >
        {error && (
          <div
            className={
              styles.error
            }
          >
            {error}
          </div>
        )}

        {/* TITLE */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Title
          </label>

          <input
            type="text"
            name="title"
            value={
              form.title
            }
            onChange={
              handleChange
            }
            placeholder="Nhập tiêu đề"
          />
        </div>

        {/* THUMBNAIL */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Thumbnail
          </label>

          <input
            type="text"
            name="thumbnail"
            value={
              form.thumbnail
            }
            onChange={
              handleChange
            }
            placeholder="Nhập link ảnh"
          />
        </div>

        {/* IMAGE PREVIEW */}

        {form.thumbnail && (
          <div
            className={
              styles.previewWrapper
            }
          >
            <img
              src={
                form.thumbnail
              }
              alt="preview"
              className={
                styles.previewImage
              }
            />
          </div>
        )}

        {/* EXCERPT */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Excerpt
          </label>

          <textarea
            name="excerpt"
            value={
              form.excerpt
            }
            onChange={
              handleChange
            }
            placeholder="Mô tả ngắn"
            rows={4}
          />
        </div>

        {/* CONTENT */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Content
          </label>

          <textarea
            name="content"
            value={
              form.content
            }
            onChange={
              handleChange
            }
            placeholder="Nội dung bài viết"
            rows={10}
          />
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className={
            styles.submitBtn
          }
        >
          {loading
            ? "Đang cập nhật..."
            : "Update News"}
        </button>
      </form>
    </div>
  );
}